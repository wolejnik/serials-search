import { RequestService } from './../../services/request/request.service';
import { Component, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable } from '@angular/material/sort';

@Component({
  selector: 'app-serials',
  templateUrl: './serials.component.html',
  styleUrls: ['./serials.component.scss'],
})
export class SerialsComponent {
  public inputValue: string = '';
  public dataRequest = [];
  public ready = false;
  public displayedColumns = ['id', 'name', 'genres', 'premiered', 'rating'];
  public dataSource: MatTableDataSource<any>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private req: RequestService, private detect: ChangeDetectorRef) {}

  searchSerials() {
    if (this.inputValue === '') return;

    this.dataRequest = [];
    this.req
      .getSerials(this.inputValue)
      // .subscribe((serials) => {
      //   serials.forEach((serial) => {
      //     this.dataRequest.push(serial);
      //     this.dataSource = new MatTableDataSource(this.dataRequest);
      //     this.dataSource.sort = this.sort;
      //     this.dataSource.paginator = this.paginator;
      //   });
      //   console.log('dataRequest', this.dataRequest);
      //   console.log('dataSource', this.dataSource);
      // });
      .toPromise()
      .then((serials) => {
        serials.forEach((serial) => {
          this.dataRequest.push(serial);
        });
        this.dataSource = new MatTableDataSource(this.dataRequest);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    console.log(this.dataRequest);
    this.ready = true;
  }
}
