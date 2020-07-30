import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatSortable, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';
import { Router } from '@angular/router';

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

  toppings = new FormControl();
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

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private req: RequestService, private router: Router) {}
  ngOnChanges(changes: SimpleChanges): void {
    // this.initData();
  }

  ngOnInit() {
    this.req.make('GET', `/search/shows?q=${this.searchValue}`).then((res) => {
      const mapped = Object.keys(res).map((key) => ({
        value: res[key].show,
      }));
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      console.log(this.dataSource);
      this.dataSource.sort = this.sort;
      this.sort.sort({ id: 'rating', start: 'desc' } as MatSortable);
      this.dataSource.paginator = this.paginator;
    });
  }

  public initData() {
    this.req.make('GET', `/search/shows?q=${this.searchValue}`).then((res) => {
      const mapped = Object.keys(res).map((key) => ({
        value: res[key].show,
      }));
      this.dataSource = new MatTableDataSource(ELEMENT_DATA);
      this.sort.sort({ id: 'rating', start: 'desc' } as MatSortable);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  public selectRow(row) {
    this.router.navigate(['serial/', '1234']);
  }

  public filtrStatus() {
    this.dataSource.filter = this.selectedFiltrStatus.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  comboChange(event) {
    if (!event) {
      this.valueSelectedMulti =
        this.toppings.value && this.toppings.value.toString();
      this.dataSource.filter = this.valueSelectedMulti.trim().toLowerCase();
      if (this.dataSource.filteredData.length === 0) {
      }
    }
  }

  resetFilter() {
    this.selectedFiltrStatus = '';
    this.valueSelectedMulti = '';

    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.sort.sort({ id: 'rating', start: 'desc' } as MatSortable);
    this.dataSource.sort = this.sort;
    this.toppings.reset();
  }
}

const ELEMENT_DATA = [
  {
    name: 'The 100',
    rating: { average: 7.9 },
    premiered: '2014-03-19',
    genres: ['Action', 'Science-Fiction'],
    status: 'Ended',
  },
  {
    name: '100% Hotter',
    rating: { average: 4.2 },
    premiered: '2013-04-29',
    genres: ['DIY'],
    status: 'Running',
  },
  {
    name: '100 Code',
    rating: { average: 6.1 },
    premiered: '2018-07-01',
    genres: ['Action', 'War'],
    status: 'Running',
  },
  {
    name: '100&',
    rating: { average: 9.21 },
    premiered: '2019-12-19',
    genres: ['Drama'],
    status: 'Running',
  },
  {
    name: '100 Dry Dream Home',
    rating: { average: 8.1 },
    premiered: '2010-06-30',
    genres: ['Food'],
    status: 'Running',
  },
  {
    name: '100 Humans',
    rating: { average: 10.0 },
    premiered: '1996-02-19',
    genres: ['Comedy', 'Adventure'],
    status: 'Ended',
  },
  {
    name: '100 film',
    rating: { average: 6.7 },
    premiered: '2020-07-19',
    genres: ['Science-Fiction'],
    status: 'Ended',
  },
  {
    name: 'Psycho 100',
    rating: { average: 9.94 },
    premiered: '2001-11-19',
    genres: ['Music'],
    status: 'Ended',
  },
  {
    name: '$100 Makeover',
    rating: { average: 8.4 },
    premiered: '2004-06-19',
    genres: ['Horror', 'Science-Fiction'],
    status: 'Running',
  },
  {
    name: '100% Bakvis',
    rating: { average: 7.7 },
    premiered: '2009-05-19',
    genres: ['Family', 'Adventure'],
    status: 'Running',
  },
];
