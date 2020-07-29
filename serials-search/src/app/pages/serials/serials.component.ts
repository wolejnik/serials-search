import { Component } from '@angular/core';

@Component({
  selector: 'app-serials',
  templateUrl: './serials.component.html',
  styleUrls: ['./serials.component.scss'],
})
export class SerialsComponent {
  public inputValue: string = '';
  public ready: boolean = false;

  constructor() {}

  public searchSerials() {
    if (this.inputValue === '') return;

    this.ready = true;
  }

  setInputValue(e) {
    this.inputValue = e.target.value;
  }
}
