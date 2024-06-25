export type IHighlightMark = {
    start: number;
    end: number;
    categories: string[];
};

export type IDashboardTextRange = {
    text: string;
    marks: IHighlightMark[];
};

export type IDashboardResponse = IDashboardTextRange[];
