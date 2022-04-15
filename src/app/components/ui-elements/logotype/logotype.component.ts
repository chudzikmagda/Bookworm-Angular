import { Component, Input } from '@angular/core';

@Component({
    selector: 'c-logotype',
    templateUrl: './logotype.component.html',
    styleUrls: ['./logotype.component.scss'],
})
export class LogotypeComponent {
    @Input() version: 'small' | undefined;
}
