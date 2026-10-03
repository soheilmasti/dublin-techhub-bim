import React from 'react';

const marks: Record<string, React.ReactNode> = {
  'urban-design': <><path d="M3 20V10h5v10M8 20V4h7v16M15 20V8h6v12M2 20h20" /><path d="M11 8h1M11 12h1M18 12h1M5 14h1" /></>,
  'residential-luxury': <><path d="M2 11 12 3l10 8M5 9v12h14V9M10 21v-7h4v7" /><path d="M7 7V4h3" /></>,
  'commercial-complexes': <><path d="M4 21V8l8-5v18M12 7h8v14M2 21h20M7 10v2m0 3v2m9-6h1m-1 4h1" /></>,
  'retail-stores': <><path d="M3 10h18l-2-6H5l-2 6ZM4 10v11h16V10M9 21v-7h6v7" /><path d="M3 10c0 3 3 3 4 0 1 3 4 3 5 0 1 3 4 3 5 0 1 3 4 3 4 0M8 4l-1 6m9-6 1 6" /></>,
  'institutional-competitions': <><path d="m2 8 10-5 10 5H2ZM4 20h16M2 22h20M6 10v8m6-8v8m6-8v8" /><path d="M4 10h16" /></>,
};

/** Category emblems share a grid and stroke, so they remain crisp at every size. */
export function CategoryMark({ categoryId, className }: { categoryId: string; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{marks[categoryId] || marks['urban-design']}</svg>;
}
