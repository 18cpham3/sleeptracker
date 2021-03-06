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
    this.sleepRating = 1;
  }

  getText(event) {
    this.notes = event.target.value.trim();
  }

  onSubmit() {
    if (this.sleeptime != null && this.waketime != null){
      let start = new Date(this.sleeptime);
      let end = new Date(this.waketime);
      let rating = this.sleepRating;
      let notes = this.notes;
      let sleepdata = new OvernightSleepData(start, end, rating, notes);
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

    //convert to formatted h:mm am/pm

    //startTime h:mm format
    if (startHour >= 12){
      if (startHour > 12){
      startHour = startHour-12
      }
      else {
        startHour = 12
      }
      startAmOrPM = "pm";
    }
    else if (startHour == 0){
      startHour = 12
      endAmOrPM = 'am';
    }

    if (startMinutes <= 10){
      startMinutes = `0${startMinutes}`
    }
    let startTime = `${startHour}:${startMinutes} ${startAmOrPM}`

    //endTime h:mm format
    if (endHour >= 12){
      if (endHour > 12){
      endHour = endHour-12
      }
      else{
        endHour = 12
      }
      endAmOrPM = 'pm';
    }
    else if (endHour == 0){
      endHour = 12
    }

    if (endMinutes <= 10){
      endMinutes = `0${endMinutes}`
    }
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
