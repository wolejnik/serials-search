import { ColorRatingService } from './../../services/color-rating/color-rating.service';
import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';
import { Router } from '@angular/router';
import { ColorRaiting } from 'src/app/model/Colors';
import { Serial } from 'src/app/models/serial';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as counterAction from '../../store/actions/serials.actions';

@Component({
  selector: 'app-table-serials',
  templateUrl: './table-serials.component.html',
  styleUrls: ['./table-serials.component.scss'],
})
export class TableSerialsComponent implements OnInit, OnChanges {
  public displayedColumns = ['name', 'genres', 'premiered', 'rating'];
  public dataSource: MatTableDataSource<any>;
  public selectedFiltrStatus: any;
  public valueSelectedMulti: string = '';

  @Input() searchValue: string = '';

  genres = new FormControl();
  public genreList: string[] = [];
  public statusList: string[] = [
    'Running',
    'Ended',
    'To Be Determined',
    'In Development',
  ];
  public serials: Serial[] = [];
  public isData: boolean = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private req: RequestService,
    private router: Router,
    private color: ColorRatingService,
    private store: Store
  ) {}

  ngOnInit() {
    this.getData;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.firstChange) {
      this.getData();
    }
  }

  public getData() {
    this.serials = [];
    this.req
      .request(`/search/shows?q=${this.searchValue}`)
      .subscribe((result) => {
        result.forEach((serial) => {
          this.serials.push({
            id: serial.show.id,
            name: serial.show.name,
            genres: serial.show.genres,
            premiered: serial.show.premiered,
            rating: serial.show.rating.average,
          });
          this.createGenresList(serial.show.genres);
        });
        this.isData = true;
        this.dataSource = new MatTableDataSource<Serial>(this.serials);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.mookData();
      });
  }

  public selectRow(row) {
    this.router.navigate(['serial/', `${row.id}`]);
  }

  public filtrStatus() {
    this.dataSource.filter = this.selectedFiltrStatus.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public setGenres(event) {
    if (!event) {
      this.valueSelectedMulti =
        this.genres.value && this.genres.value.toString();
      this.dataSource.filter = this.valueSelectedMulti.trim().toLowerCase();
      if (this.dataSource.filteredData.length === 0) {
        this.isData = false;
      }
    }
  }

  public resetFilter() {
    this.selectedFiltrStatus = '';
    this.valueSelectedMulti = '';

    this.dataSource = new MatTableDataSource(this.serials);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.genres.reset();
    this.isData = true;
  }

  public setColorRating(value: string): ColorRaiting {
    return this.color.setColor(value);
  }

  public createGenresList(serial: any): void {
    serial.forEach((ele) => {
      if (!this.genreList.includes(ele)) {
        this.genreList.push(ele);
      }
    });
  }

  mookData() {
    this.store.dispatch(counterAction.saveSerials({ value: this.serials }));
  }
}
