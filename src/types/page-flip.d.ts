declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, options?: any);
    loadFromImages(imagesHref: string[]): void;
    loadFromHTML(items: NodeListOf<HTMLElement> | HTMLElement[]): void;
    flipNext(): void;
    flipPrev(): void;
    flip(pageIndex: number): void;
    getCurrentPageIndex(): number;
    getPageCount(): number;
    destroy(): void;
    on(event: string, callback: (e: any) => void): void;
    off(event: string, callback: (e: any) => void): void;
  }
}
