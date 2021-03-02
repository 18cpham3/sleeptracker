import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OvernightsleepPageRoutingModule } from './overnightsleep-routing.module';

import { OvernightsleepPage } from './overnightsleep.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OvernightsleepPageRoutingModule
  ],
  declarations: [OvernightsleepPage]
})
export class OvernightsleepPageModule {}
