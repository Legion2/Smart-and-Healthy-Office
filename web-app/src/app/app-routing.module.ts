import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RoomComponent} from './room/room.component';

const routes: Routes = [
  { path: 'room', component: RoomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
