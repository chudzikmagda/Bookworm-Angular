import { Component, Input, OnInit } from '@angular/core';

interface setClassInterface {
    'table-cell': boolean;
    'table-cell--tiny': boolean;
    'table-cell--basic': boolean;
    'table-cell--wide': boolean;
    'table-cell--superwide': boolean;
    'table-cell--valign-center': boolean;
}

@Component({
    selector: 'c-table-cell',
    templateUrl: './table-cell.component.html',
    styleUrls: ['./table-cell.component.scss'],
})
export class TableCellComponent implements OnInit {
    @Input() editable: boolean = false;
    @Input() variant: 'tiny' | 'basic' | 'wide' | 'superwide' | undefined;
    @Input() valignCenter: boolean = false;

    setClassBasedOnVariant(): setClassInterface {
        return {
            'table-cell': true,
            'table-cell--tiny': this.variant === 'tiny',
            'table-cell--basic': this.variant === 'basic',
            'table-cell--wide': this.variant === 'wide',
            'table-cell--superwide': this.variant === 'superwide',
            'table-cell--valign-center': this.valignCenter === true,
        };
    }
    ngOnInit() {
        this.setClassBasedOnVariant();
    }
}
