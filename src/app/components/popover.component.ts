import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    computed,
    effect,
    inject,
    untracked,
    viewChild,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { IPopoverInset, PopoverService } from '../services/popover.service';

type PopoverElement = HTMLElement & { showPopover: () => void; hidePopover: () => void };

/** Container for the app's popover element, which can dynamically display content. */
@Component({
    selector: 'app-popover',
    template: `
        <div
            #popover
            popover
            [style.inset-block-start]="inset().blockStart + 'px'"
            [style.inset-inline-start]="inset().inlineStart + 'px'">
                <ng-container *ngTemplateOutlet="popoverState()?.template ?? default" />
        </div>

        <ng-template #default />
    `,
    styles: `
        div[popover] {
            position: absolute;
            inset: unset;
            border: 1px solid black;
            border-radius: 20px;
            display: none;

            &:popover-open {
                // Need to explicitly define display value to use animation when popover appears.
                display: block;
                animation: opened 0.25s;
            }
        }

        @keyframes opened {
            from {
                opacity: 0;
            }

            to {
                opacity: 1;
            }
        }

    `,
    standalone: true,
    imports: [NgTemplateOutlet],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopoverComponent {
    protected readonly popoverElement = viewChild<ElementRef | undefined>('popover');
    protected readonly popoverState = inject(PopoverService).state;

    protected readonly inset = computed<IPopoverInset>(() => {
        const state = this.popoverState();

        let blockStart = 0;
        let inlineStart = 0;

        if (state?.inset) {
            blockStart = state.inset.blockStart;
            inlineStart = state.inset.inlineStart;
        }

        return {
            blockStart,
            inlineStart
        };
    });

    constructor() {
        effect(() => {
            const currTemplate = this.popoverState();
            const popover = this.popoverElement()?.nativeElement as PopoverElement;

            untracked(() => {
                if (currTemplate) {
                    popover?.showPopover();
                } else {
                    popover?.hidePopover();
                }
            })
        });
    }
}
