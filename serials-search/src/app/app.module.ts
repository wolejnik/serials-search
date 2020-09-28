import { ColorRatingService } from './services/color-rating/color-rating.service';
import { RequestService } from './services/request/request.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SerialsComponent } from './pages/serials/serials.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableSerialsComponent } from './components/table-serials/table-serials.component';
import { MatSelectModule } from '@angular/material/select';
import { SerialComponent } from './pages/serial/serial.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SerialsComponent,
    TableSerialsComponent,
    SerialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    MatSelectModule,
    HttpClientModule,
      StoreModule.forRoot(reducers),
      // Instrumentation must be imported after importing StoreModule (config is optional)
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        // logOnly: environment.production, // Restrict extension to log-only mode
      }),
  ],
  providers: [RequestService, ColorRatingService],
  bootstrap: [AppComponent],
})
export class AppModule {}
