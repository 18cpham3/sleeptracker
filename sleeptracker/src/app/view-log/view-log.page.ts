import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.page.html',
  styleUrls: ['./view-log.page.scss'],
})
export class ViewLogPage implements OnInit {
  selection:string;

  constructor() { }

  ngOnInit() {
    this.selection = "overnightsleep";
  }

}
