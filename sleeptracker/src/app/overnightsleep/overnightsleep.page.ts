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
        this.presentSuccessAlert(start,end);
      }
    }
    else {
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

  async presentSuccessAlert(start, end) {
    let startAmOrPM = "am";
    let endAmOrPM = "am";
    let startHour = start.getHours();
    let endHour = end.getHours();
    let startMinutes = start.getUTCMinutes();
    let endMinutes = end.getUTCMinutes();
    if (startHour >= 12){
      if (startHour != 12){
        startHour = startHour-12
      }
      startAmOrPM = "pm";
    }
    if (endHour >= 12 ){
      if (endHour != 12){
        endHour = endHour-12
      }
      endAmOrPM = 'pm';
    }
    let startTime = `${startHour}:${startMinutes} ${startAmOrPM}`
    let endTime = `${endHour}:${endMinutes} ${endAmOrPM}`
   const alert = await this.alertController.create({
     cssClass: 'successAlert',
     header: 'Saved!',
     subHeader: `You slept from ${start.toLocaleDateString()} at ${startTime} to ${end.toLocaleDateString()} at ${endTime}.`,
     message: 'Your sleep was logged.',
     buttons: ['OK']
   });

    await alert.present();
   }
}
