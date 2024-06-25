import { Injectable, signal } from '@angular/core';
import { COLORS } from 'src/data/colors';
import { MOCK_DATA } from 'src/data/mock-data';
import { IDashboardTextRange, IHighlightMark } from 'src/entities/dasboard-response';
import {
    IHighlightRange,
    IHighlightRanges,
    IHiglightColorInfo as IHiglightColorInfo,
} from 'src/entities/highlight';

const NETWORK_DELAY_MILLIS = 100;

/** Fetches from the server and stores texts with highlight ranges. */
@Injectable({ providedIn: 'root' })
export class DashboardService {
    private readonly _dataItems = signal<IHighlightRanges[]>([]);
    private readonly colors: string[] = [...COLORS];
    private readonly categoryToColor = new Map<string, IHiglightColorInfo>();

    readonly dataItems = this._dataItems.asReadonly();

    getData(): void {
        // Using setTimeout to simulate fetching from the network.
        setTimeout(() => {
            const response = structuredClone(MOCK_DATA);
            const ranges = response.map(item => this.convertResponseItemToRange(item));

            this._dataItems.set(ranges);
        }, NETWORK_DELAY_MILLIS);
    }

    private convertResponseItemToRange({ text, marks }: IDashboardTextRange): IHighlightRanges {
        if (!marks.length) {
            return [{ text, colors: [] }];
        }

        const ranges: IHighlightRanges = [];

        // Handle first unmarked range if it exists.
        if (marks[0].start) {
            ranges.push({
                text: text.substring(0, marks.length ? marks[0].start : undefined),
                colors: [],
            });
        }

        let prevMark: IHighlightMark | undefined;

        for (const mark of marks) {
            // Handle possible unmarked range between two marked ranges.
            if (prevMark && prevMark.end + 1 <= mark.start) {
                const unmarkedRange: IHighlightRange = {
                    text: text.substring(prevMark.end, mark.start),
                    colors: [],
                };

                ranges.push(unmarkedRange);
            }

            ranges.push({
                text: text.substring(mark.start, mark.end),
                colors: this.getCategoriesWithColors(mark.categories),
            });

            prevMark = mark;
        }

        // Handle final unmarked range if it exists.
        if (prevMark && prevMark.end < text.length) {
            ranges.push({
                text: text.substring(prevMark.end),
                colors: [],
            });
        }

        return ranges;
    }

    private getCategoriesWithColors(categoryNames: string[]): IHiglightColorInfo[] {
        const highlightColors: IHiglightColorInfo[] = [];

        for (const name of categoryNames) {
            let categoryColor: IHiglightColorInfo | undefined;

            if (!this.categoryToColor.has(name)) {
                const color = this.colors.pop();

                if (!color) {
                    continue;
                }

                categoryColor = { description: name, color };

                this.categoryToColor.set(name, categoryColor);
            } else {
                categoryColor = this.categoryToColor.get(name);
            }
            
            if (categoryColor) {
                highlightColors.push(categoryColor);
            }
        }

        return highlightColors;
    }
}
