import { Serial } from './../../models/serial';
import { Observable } from 'rxjs';
import { OnInit, Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as counterAction from '../../store/actions/serials.actions';
import { getSearcherSerialData, getSerialsData } from 'src/app/store';

@Component({
  selector: 'app-serials',
  templateUrl: './serials.component.html',
  styleUrls: ['./serials.component.scss'],
})
export class SerialsComponent implements OnInit {
  public inputValue: string = '';
  public ready: boolean = false;
  public searchedSerial$: Observable<string>;
  public searchedSerialsData$: Observable<Serial[]>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.searchedSerial$ = this.store.select(getSearcherSerialData);
    this.searchedSerialsData$ = this.store.select(getSerialsData);

    if (this.searchedSerialsData$ && this.searchedSerial$) {
      this.searchedSerial$.subscribe((val) => {
        if (val !== null) {
          this.ready = true;
          this.inputValue = val;
        }
      });
    }
  }

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
