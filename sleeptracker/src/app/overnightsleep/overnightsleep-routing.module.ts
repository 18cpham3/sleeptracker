import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OvernightsleepPage } from './overnightsleep.page';

const routes: Routes = [
  {
    path: '',
    component: OvernightsleepPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OvernightsleepPageRoutingModule {}
