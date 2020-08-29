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
  public genreList: string[] = [
    'Action',
    'Adult',
    'Adventure',
    'Comedy',
    'DIY',
    'Family',
    'Drama',
    'Horror',
    'Science-Fiction',
    'War',
  ];
  public statusList: string[] = [
    'Running',
    'Ended',
    'To Be Determined',
    'In Development',
  ];
  public serials: Serial[] = [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private req: RequestService,
    private router: Router,
    private color: ColorRatingService
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
    // this.req.make('GET', `/search/shows?q=${this.searchValue}`).then((res) => {
    //   const mapped = Object.keys(res).map((key) => ({
    //     value: res[key].show,
    //   }));
    //   this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    //   this.dataSource.sort = this.sort;
    //   this.dataSource.paginator = this.paginator;
    // });
    this.req
      .request(`/search/shows?q=${this.searchValue}`)
      .subscribe((result) => {
        result.forEach((serial) => {
          this.serials.push({
            name: serial.show.name,
            genres: serial.show.genres,
            premiered: serial.show.premiered,
            rating: serial.show.rating.average,
          });
        });
        this.dataSource = new MatTableDataSource<Serial>(this.serials);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  public selectRow(row) {
    this.router.navigate(['serial/', `${row.show.id}`]);
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
  }

  public setColorRating(value: string): ColorRaiting {
    return this.color.setColor(value);
  }
}

const ELEMENT_DATA = [
  {
    id: '6',
    name: 'The 100',
    rating: { average: 7.9 },
    premiered: '2014-03-19',
    genres: ['Action', 'Science-Fiction'],
    status: 'Ended',
  },
  {
    id: '13652',
    name: '100% Hotter',
    rating: { average: 4.2 },
    premiered: '2013-04-29',
    genres: ['DIY'],
    status: 'Running',
  },
  {
    id: '3953',
    name: '100 Code',
    rating: { average: 6.1 },
    premiered: '2018-07-01',
    genres: ['Action', 'War'],
    status: 'Running',
  },
  {
    id: '33159',
    name: '100&',
    rating: { average: 9.21 },
    premiered: '2019-12-19',
    genres: ['Drama'],
    status: 'Running',
  },
  {
    id: '45669',
    name: '100 Dry Dream Home',
    rating: { average: 8.1 },
    genres: ['Food'],
    status: 'Running',
  },
  {
    id: '46701',
    name: '100 Humans',
    rating: { average: 10.0 },
    premiered: '1996-02-19',
    genres: ['Comedy', 'Adventure'],
    status: 'Ended',
  },
  {
    id: '36508',
    name: '100 film',
    rating: { average: 6.7 },
    premiered: '2020-07-19',
    genres: ['Science-Fiction'],
    status: 'Ended',
  },
  {
    id: '18260',
    name: 'Psycho 100',
    rating: { average: 9.94 },
    premiered: '2001-11-19',
    genres: ['Music'],
    status: 'Ended',
  },
  {
    id: '32093',
    name: '$100 Makeover',
    rating: { average: 8.4 },
    premiered: '2004-06-19',
    genres: ['Horror', 'Science-Fiction'],
    status: 'Running',
  },
  {
    id: '33558',
    name: '100% Bakvis',
    rating: { average: 7.7 },
    premiered: '2009-05-19',
    genres: ['Family', 'Adventure'],
    status: 'Running',
  },
];
