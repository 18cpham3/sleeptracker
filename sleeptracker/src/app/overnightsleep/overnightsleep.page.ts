import { Component, OnInit } from '@angular/core';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { SleepService } from '../services/sleep.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-overnightsleep',
  templateUrl: './overnightsleep.page.html',
  styleUrls: ['./overnightsleep.page.scss'],
})
export class OvernightsleepPage implements OnInit {
  sleeptime:string;
  waketime:string;
  sleepRating:number;
  // notes:string;
  notes:string;

  constructor(public sleepService:SleepService, public alertController: AlertController) { }

  ngOnInit(){
  }

  getText(event) {
    this.notes = event.target.value;
  }
  onSubmit() {
    if (this.sleeptime != null && this.waketime != null){
      let start = new Date(this.sleeptime);
      let end = new Date(this.waketime);
      let sleepdata = new OvernightSleepData(start, end);
      if (end < start){
        this.presentErrorAlert();
      }
      else{
        this.sleepService.logOvernightData(sleepdata);
        this.presentSuccessAlert();
      }
    }
    else if (this.sleeptime == null || this.waketime == null ){
      this.presentNullAlert();
    }
  }

  async presentNullAlert() {
   const alert = await this.alertController.create({
     cssClass: 'nullAlert',
     header: 'Incomplete Submission',
     message: 'Please fill out your sleep before submitting.',
     buttons: ['OK']
   });

   await alert.present();
 }

 async presentErrorAlert() {
  const alert = await this.alertController.create({
    cssClass: 'errorAlert',
    header: 'Error!',
    message: 'An error has occurred. Please check your form before submitting.',
    buttons: ['OK']
  });

    await alert.present();
  }

  async presentSuccessAlert() {
   const alert = await this.alertController.create({
     cssClass: 'successAlert',
     header: 'Saved!',
     message: 'Your sleep was logged.',
     buttons: ['OK']
   });

    await alert.present();
   }

}
