import {
    ChangeDetectionStrategy,
    Component,
    TemplateRef,
    computed,
    inject,
    input,
    signal,
    viewChild,
} from '@angular/core';
import { IHighlightRange, IHiglightColorInfo } from 'src/entities/highlight';
import { HighlightRangeComponent } from './highlight-range.component';
import { PopoverService } from '../services/popover.service';
import { MAX_HIGHLIGHT_DEPTH } from 'src/data/constants';

const PREVENT_FLICKERING_DELAY_MILLIS = 100;

/** Displays a text with highlight underlines. Hovering over the underlined portions
 * of the text displays a tooltip with more information. */
@Component({
    selector: 'app-highlight-container',
    template: `
        @for (range of processedRanges(); track range) {
            <app-highlight-range
                #rangeElement
                (mouseover)="showTooltip(range.original, $event)"
                (mouseout)="hideTooltip(range.original)"
                [range]="range.padded"
                [index]="0" />
        }

        <ng-template #hoveredRangeTooltip>
            <ul class="range-colors-tooltip">
                @for (colorInfo of tooltipRange()?.colors; track colorInfo.description) {
                    <li>
                        <div class="circle" [style.background-color]="colorInfo.color"></div>
                        {{ colorInfo.description }}
                    </li>
                }
            </ul>
        </ng-template>
    `,
    styles: `
        ul.range-colors-tooltip {
            margin: 0.5em;

            li {
                display: flex;
                align-items: center;
                gap: 0.25rem;
            }
        }

        .circle {
            width: 0.5em;
            aspect-ratio: 1;
            border-radius: 100rem;
        }
    `,
    standalone: true,
    imports: [HighlightRangeComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightContainerComponent {
    readonly ranges = input.required<IHighlightRange[]>();
    readonly tooltipTempalte = viewChild<TemplateRef<unknown> | undefined>('hoveredRangeTooltip');

    private readonly popoverService = inject(PopoverService);

    protected readonly tooltipRange = signal<IHighlightRange | undefined>(undefined);

    protected readonly processedRanges = computed(() => {
        return this.ranges().map(r => this.getOriginalAndPaddedRange(r));
    });

    protected showTooltip(range: IHighlightRange, event: MouseEvent): void {
        const template = this.tooltipTempalte();

        if (!template || !range.colors.length) {
            return;
        }

        setTimeout(() => {
            this.tooltipRange.set(range);

            this.popoverService.show({
                template,
                inset: {
                    blockStart: event.clientY,
                    inlineStart: event.clientX,
                },
            });
        }, PREVENT_FLICKERING_DELAY_MILLIS);
    }

    protected hideTooltip(range: IHighlightRange): void {
        if (!range.colors.length) {
            return;
        }

        setTimeout(() => {
            this.tooltipRange.set(undefined);
            this.popoverService.hide();
        }, PREVENT_FLICKERING_DELAY_MILLIS);
    }

    /** Make sure all ranges have MAX_HIGHLIGHT_DEPTH items in their colorsInfo array to ensure all lines of text have the same height. */
    private getOriginalAndPaddedRange(range: IHighlightRange): {
        padded: IHighlightRange;
        original: IHighlightRange;
    } {
        const amountToPad = MAX_HIGHLIGHT_DEPTH - range.colors.length;
        const paddedColorsInfo: IHiglightColorInfo[] = [...range.colors];

        for (let i = 0; i < amountToPad; i++) {
            paddedColorsInfo.push({
                description: '',
                color: 'transparent',
            });
        }

        const paddedRange: IHighlightRange = {
            text: range.text,
            colors: paddedColorsInfo,
        };

        return {
            padded: paddedRange,
            original: range,
        };
    }
}
