import { Component, Input } from '@angular/core';

@Component({
  selector: 'c-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() click!: void;
  @Input() variant!: string;

  constructor() {}
}
