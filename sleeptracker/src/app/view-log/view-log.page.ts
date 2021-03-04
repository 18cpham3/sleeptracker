import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.page.html',
  styleUrls: ['./view-log.page.scss'],
})
export class ViewLogPage implements OnInit {
  sleepData:any = SleepService.AllSleepData;
  selection:string;

  constructor(public sleepService:SleepService) { }

  ngOnInit() {
    console.log(this.sleepData)
    this.selection = "overnightsleep";
  }

}
