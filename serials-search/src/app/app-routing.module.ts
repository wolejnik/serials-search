import { SerialsComponent } from './pages/serials/serials.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SerialComponent } from './pages/serial/serial.component';

const routes: Routes = [
  { path: '', component: SerialsComponent },
  { path: 'serial/:id', component: SerialComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
