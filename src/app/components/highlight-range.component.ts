import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { IHighlightRange } from 'src/entities/highlight';
import { MAX_HIGHLIGHT_DEPTH } from 'src/data/constants';

const UNDERLINE_THICKNESS_EM = 0.15;

/** Displays a single range of text with underline highlights. */
@Component({
    selector: 'app-highlight-range',
    template: `
        @if (index() < MAX_DEPTH) {
            <span
                class="highlight"
                [style.text-decoration-color]="color()"
                [style.text-underline-offset]="offset()">
                    <app-highlight-range [range]="range()" [index]="index() + 1" />
            </span>
        } @else {
            <span>{{ range().text }}</span>
        }
    `,
    styles: `
        :host {
            line-height: 2.5em;
        }

        .highlight {
            text-decoration: underline;
            text-decoration-thickness: ${UNDERLINE_THICKNESS_EM}em;
        }
    `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighlightRangeComponent {
    /** Add constant to the template's scope. */
    protected readonly MAX_DEPTH = MAX_HIGHLIGHT_DEPTH;

    readonly range = input.required<IHighlightRange>();
    readonly index = input.required<number>();

    protected readonly color = computed(() => {
        const range = this.range();
        const index = this.index();

        return range.colors.at(index)?.color ?? 'transparent';
    });

    protected readonly offset = computed(() => {
        const currIndex = this.index();
        const offsetNumeric = UNDERLINE_THICKNESS_EM * currIndex + 0.3;

        return offsetNumeric + 'em';
    });
}
