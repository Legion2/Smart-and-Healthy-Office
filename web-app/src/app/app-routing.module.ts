import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemperatureComponent } from './temperature/temperature.component';

const routes: Routes = [
  { path: 'temperature', component: TemperatureComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
