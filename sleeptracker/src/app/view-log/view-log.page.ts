import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.page.html',
  styleUrls: ['./view-log.page.scss'],
})
export class ViewLogPage implements OnInit {
  overnightSleepData:any = SleepService.AllOvernightData;
  stanfordSleepData:any = SleepService.AllSleepinessData;
  selection:string;

  constructor(public sleepService:SleepService) { }

  ngOnInit() {
    this.selection = "overnightsleep";
  }

}
