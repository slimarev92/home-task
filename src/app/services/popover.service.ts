import { Injectable, TemplateRef, signal } from '@angular/core';

export type IPopoverInset = {
    blockStart: number;
    inlineStart: number;
};

export type IPopoverServiceState = {
    template: TemplateRef<unknown>;
    inset?: IPopoverInset;
};

/** Used to display or hide content in the app's popover element. */
@Injectable({ providedIn: 'root' })
export class PopoverService {
    private readonly _state = signal<IPopoverServiceState | undefined>(undefined);

    public readonly state = this._state.asReadonly();

    show(state: IPopoverServiceState): void {
        this._state.set(state);
    }

    hide(): void {
        this._state.set(undefined);
    }
}
