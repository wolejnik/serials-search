import {
  Component,
  OnInit,
  ViewChild,
  Input,
  OnChanges,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { MatSortable, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl } from '@angular/forms';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-table-serials',
  templateUrl: './table-serials.component.html',
  styleUrls: ['./table-serials.component.scss'],
})
export class TableSerialsComponent implements OnInit, OnChanges {
  displayedColumns: string[] = ['id', 'name', 'raitng'];
  // public displayedColumns = ['id', 'name', 'genres', 'premiered', 'rating'];
  dataSource: MatTableDataSource<any>;
  selectedFiltr: any;
  valueSelectedMulti: string;
  public hiddenTable: boolean = false;
  public dataRequest = [];
  @Input() searchValue: string = '';
  @Input() data: any;

  toppings = new FormControl();
  toppingList: string[] = [
    'black',
    'blue',
    'red',
    'Pepperoni',
    'Sausage',
    'Tomato',
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private req: RequestService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.test();
  }

  ngOnInit() {
    this.initData();
  }

  public initData() {
    console.log('this.searchValue', this.searchValue);
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator;
    this.sort.sort({ id: 'raitng', start: 'desc' } as MatSortable);
    this.dataSource.sort = this.sort;

    console.log('hardcode', this.dataSource);
  }

  public test() {
    this.dataRequest = [];
    this.req.getSerials(this.searchValue).subscribe((serials) => {
      serials.forEach((serial) => {
        this.dataRequest.push(serial);
        // this.dataSource = new MatTableDataSource(this.dataRequest);
        // this.dataSource.paginator = this.paginator;
        // this.sort.sort({ id: 'rating', start: 'desc' } as MatSortable);
        // this.dataSource.sort = this.sort;
      });
    });
    // console.log('hardcode', this.dataSource);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public filtrStatus() {
    this.dataSource.filter = this.selectedFiltr.trim().toLowerCase();

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
        this.hiddenTable = true;
      }
    }
  }

  resetFilter() {
    this.selectedFiltr = '';
    this.valueSelectedMulti = '';

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
    this.sort.sort({ id: 'progress', start: 'desc' } as MatSortable);
    this.dataSource.sort = this.sort;
    this.hiddenTable = false;
    this.toppings.reset();
  }
}

export interface PeriodicElement {
  name: string;
  id: number;
  raitng: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', raitng: 1.0079 },
  { id: 2, name: 'Helium', raitng: 4.0026 },
  { id: 3, name: 'Lithium', raitng: 6.941 },
  { id: 4, name: 'Beryllium', raitng: 9.0122 },
  { id: 5, name: 'Boron', raitng: 10.811 },
  { id: 6, name: 'Carbon', raitng: 12.0107 },
  { id: 7, name: 'Nitrogen', raitng: 14.0067 },
  { id: 8, name: 'Oxygen', raitng: 15.9994 },
  { id: 9, name: 'Fluorine', raitng: 18.9984 },
  { id: 10, name: 'Neon', raitng: 20.1797 },
];
