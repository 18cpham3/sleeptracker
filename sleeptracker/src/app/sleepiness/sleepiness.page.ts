import { Component, OnInit } from '@angular/core';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';
import { SleepService } from '../services/sleep.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-sleepiness',
  templateUrl: './sleepiness.page.html',
  styleUrls: ['./sleepiness.page.scss'],
})
export class SleepinessPage implements OnInit {
  StanfordSleepinessValue:number;
  sleeptime:string;

  constructor(public sleepService:SleepService, public alertController:AlertController) { }

  ngOnInit() {
  }

  getSleepinessValue(event){
    this.StanfordSleepinessValue = event.target.value;
  }

  onSubmit(){

    if (this.StanfordSleepinessValue != null && this.sleeptime != null)  {
      let sleepinessValue = new StanfordSleepinessData(this.StanfordSleepinessValue);
      this.sleepService.logSleepinessData(sleepinessValue);
      this.presentSuccessAlert()
    }
    else{
      this.presentNullAlert()
    }
  }

  async presentNullAlert() {
   const alert = await this.alertController.create({
     cssClass: 'nullAlert',
     header: 'Incomplete Submission',
     message: 'Please fill out your sleepiness value before submitting.',
     buttons: ['OK']
   });

   await alert.present();
  }

  async presentSuccessAlert() {
  const alert = await this.alertController.create({
    cssClass: 'successAlert',
    header: 'Saved!',
    message: 'Your sleepiness value was logged.',
    buttons: ['OK']
  });

   await alert.present();
  }
}
