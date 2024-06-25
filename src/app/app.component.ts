import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DashboardService } from './services/dashboard.service';
import { HighlightContainerComponent } from './components/highlight-container.component';
import { PopoverComponent } from './components/popover.component';

@Component({
    selector: 'app-root',
    template: `
        @for (item of dashboardItems(); track item) {
            <app-highlight-container [ranges]="item" />
        }

        <app-popover />
    `,
    styles: `
        :host {
            display: flex;
            flex-direction: column;
            margin: 2rem;
        }
    `,
    standalone: true,
    imports: [HighlightContainerComponent, PopoverComponent],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
    protected readonly dashboardService = inject(DashboardService);
    protected readonly dashboardItems = this.dashboardService.dataItems;

    constructor() {
        this.dashboardService.getData();
    }
}
