import { RequestService } from './../../services/request/request.service';
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-serials',
  templateUrl: './serials.component.html',
  styleUrls: ['./serials.component.scss'],
})
export class SerialsComponent {
  public inputValue: string = '';
  public dataRequest = [];
  public ready: boolean = false;

  constructor(private req: RequestService) {}

  public searchSerials() {
    if (this.inputValue === '') return;

    this.dataRequest = [];
    this.req.getSerials(this.inputValue).subscribe((serials) => {
      serials.forEach((serial) => {
        this.dataRequest.push(serial);
      });
    });
    console.log('dataRequest', this.dataRequest);
    this.ready = true;
  }

  setInputValue(e) {
    this.inputValue = e.target.value;
  }
}
