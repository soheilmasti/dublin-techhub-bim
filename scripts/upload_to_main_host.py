import os
import sys
import time
from ftplib import FTP
from concurrent.futures import ThreadPoolExecutor, as_completed

HOST = "217.76.150.74"
USER = "bimco.es"
PASS = "Soheil@masti66"
LOCAL_DIR = os.path.abspath("dist")
REMOTE_ROOT = "html"
MAX_WORKERS = 4

def get_ftp_connection():
    ftp = FTP()
    ftp.connect(HOST, 21, timeout=60)
    ftp.login(USER, PASS)
    ftp.set_pasv(True)
    return ftp

def make_dirs_recursive(ftp, remote_path):
    parts = remote_path.strip("/").split("/")
    curr = ""
    for part in parts:
        if not part:
            continue
        curr += ("/" + part) if curr else part
        try:
            ftp.mkd(curr)
        except Exception:
            pass

def collect_files():
    priority_files = []
    other_files = []

    for root, dirs, files in os.walk(LOCAL_DIR):
        for f in files:
            full_path = os.path.join(root, f)
            rel_path = os.path.relpath(full_path, LOCAL_DIR).replace("\\", "/")
            
            # Prioritize index.html, assets, team, manifests
            if rel_path == "index.html" or rel_path.startswith("assets/") or rel_path.startswith("team/") or "manifest" in rel_path:
                priority_files.append((full_path, rel_path))
            else:
                other_files.append((full_path, rel_path))

    return priority_files + other_files

def precreate_directories(ftp, file_list):
    print("Pre-creating remote directory tree...")
    dirs_to_create = set()
    for _, rel_path in file_list:
        remote_dir = os.path.dirname(rel_path)
        if remote_dir:
            dirs_to_create.add(remote_dir)

    # Sort directories by depth
    sorted_dirs = sorted(list(dirs_to_create), key=lambda d: d.count('/'))
    ftp.cwd(REMOTE_ROOT)
    for d in sorted_dirs:
        make_dirs_recursive(ftp, d)
    print(f"Created {len(sorted_dirs)} remote directories.")
    
    # Clean remote stale book pages (> totalPages)
    print("Checking for remote stale pages in book_pages directories...")
    for vol, count in [('portfolio_villas', 32), ('portfolio_apartments', 32), ('portfolio_urban', 32)]:
        remote_bp = f"/{REMOTE_ROOT}/{vol}/book_pages"
        try:
            ftp.cwd(remote_bp)
            remote_files = ftp.nlst()
            for rf in remote_files:
                if rf.endswith('.jpg'):
                    try:
                        num = int(rf.replace('page_', '').replace('.jpg', ''))
                        if num > count:
                            print(f"Removing remote stale file: {remote_bp}/{rf}")
                            ftp.delete(rf)
                    except Exception:
                        pass
        except Exception as e:
            pass
    ftp.cwd(f"/{REMOTE_ROOT}")

def upload_single_file(item, worker_id, total, counter_dict):
    local_path, rel_path = item
    max_retries = 3
    remote_full_path = f"{REMOTE_ROOT}/{rel_path}"

    for attempt in range(max_retries):
        try:
            ftp = get_ftp_connection()
            # Check size on remote
            remote_size = None
            try:
                remote_size = ftp.size(remote_full_path)
            except Exception:
                pass

            local_size = os.path.getsize(local_path)

            # Force upload index.html and manifest files to avoid stale caching
            always_upload = (rel_path == "index.html" or rel_path.endswith(".json") or rel_path.startswith("assets/"))
            if not always_upload and remote_size == local_size:
                ftp.quit()
                counter_dict['done'] += 1
                curr = counter_dict['done']
                print(f"[{curr}/{total}] SKIPPED (already uploaded): {rel_path}")
                return True

            # Upload
            with open(local_path, "rb") as fp:
                ftp.storbinary(f"STOR {remote_full_path}", fp, blocksize=131072)

            ftp.quit()
            counter_dict['done'] += 1
            curr = counter_dict['done']
            size_kb = local_size / 1024
            print(f"[{curr}/{total}] UPLOADED: {rel_path} ({size_kb:.1f} KB)")
            return True
        except Exception as e:
            if attempt < max_retries - 1:
                time.sleep(1.5)
            else:
                print(f"FAILED {rel_path}: {e}")
                return False

def main():
    print("=" * 60)
    print("BIMCO.ES MAIN HOST DEPLOYMENT SCRIPT (ARSYS)")
    print(f"Target: {HOST} | User: {USER}")
    print("=" * 60)

    # Initial check
    master_ftp = get_ftp_connection()
    all_files = collect_files()
    total = len(all_files)
    print(f"Collected {total} files from {LOCAL_DIR}")

    precreate_directories(master_ftp, all_files)
    master_ftp.quit()

    counter = {'done': 0}
    start_time = time.time()

    print(f"\nStarting parallel upload with {MAX_WORKERS} workers...")
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = [executor.submit(upload_single_file, item, i % MAX_WORKERS, total, counter) for i, item in enumerate(all_files)]
        for future in as_completed(futures):
            res = future.result()

    total_time = time.time() - start_time
    print("=" * 60)
    print(f"DEPLOYMENT COMPLETED IN {total_time:.1f}s!")
    print("=" * 60)

if __name__ == "__main__":
    main()
