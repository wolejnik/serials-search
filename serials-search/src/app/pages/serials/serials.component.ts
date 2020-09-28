import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as counterAction from '../../store/actions/serials.actions';

@Component({
  selector: 'app-serials',
  templateUrl: './serials.component.html',
  styleUrls: ['./serials.component.scss'],
})
export class SerialsComponent {
  public inputValue: string = '';
  public ready: boolean = false;

  constructor(private store: Store) {}

  public searchSerials() {
    if (this.inputValue === '') return;

    this.ready = true;
  }

  public setInputValue(e) {
    this.inputValue = e.target.value;
    this.store.dispatch(
      counterAction.searchedSerial({ value: this.inputValue })
    );
  }
}
