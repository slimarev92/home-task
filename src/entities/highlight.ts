export type IHiglightColorInfo = {
    description: string;
    color: string;
};

export type IHighlightRange = {
    text: string;
    colors: IHiglightColorInfo[];
};

export type IHighlightRanges = IHighlightRange[];
