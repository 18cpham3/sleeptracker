import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.page.html',
  styleUrls: ['./view-log.page.scss'],
})
export class ViewLogPage implements OnInit {
  overnightSleepData:any = SleepService.AllOvernightData;
  stanfordSleepData:any = SleepService.AllSleepinessData;
  selection:string;

  constructor(public sleepService:SleepService,  public alertController:AlertController) { }

  ngOnInit() {
    this.selection = "overnightsleep";
  }

  onResetSleepLog(){
    this.warningAlertSleepLog();

  }

  onResetSleepinessLog(){
    this.warningAlertSleepinessLog();
  }

  async warningAlertSleepLog() {
   const alert = await this.alertController.create({
     cssClass: 'warningAlert',
     header: 'Resetting logged data',
     message: 'This will reset all logged data. Do you wish to proceed?',
     buttons: [
        {
         text: 'Yes',
         handler: () => {
           this.overnightSleepData = [];
           this.sleepService.clearOvernightSleepData();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
        }
      ]
    });

     await alert.present();
   }

   async warningAlertSleepinessLog() {
    const alert = await this.alertController.create({
      cssClass: 'warningAlert',
      header: 'Resetting logged data',
      message: 'This will reset all logged data. Do you wish to proceed?',
      buttons: [
          {
          text: 'Yes',
          handler: () => {
            this.stanfordSleepData = [];
            this.sleepService.clearSleepinessData();
            }
          },
         {
           text: 'Cancel',
           role: 'cancel',
           cssClass: 'secondary',
         }
       ]
     });

      await alert.present();
    }

}
