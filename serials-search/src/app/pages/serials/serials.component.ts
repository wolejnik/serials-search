import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-serials',
  templateUrl: './serials.component.html',
  styleUrls: ['./serials.component.scss'],
})
export class SerialsComponent {
  public inputValue: string = '';

  constructor() {}

  public searchSerials() {
    if (this.inputValue === '') return;
  }
}
