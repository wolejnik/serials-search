import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSerialsComponent } from './table-serials.component';

describe('TableSerialsComponent', () => {
  let component: TableSerialsComponent;
  let fixture: ComponentFixture<TableSerialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableSerialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSerialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
