import { Component, OnInit } from '@angular/core';
import { SleepService } from '../services/sleep.service';
import { AlertController } from '@ionic/angular';
import {AngularFirestore, AngularFirestoreCollection, DocumentData } from '@angular/fire/firestore';

@Component({
  selector: 'app-view-log',
  templateUrl: './view-log.page.html',
  styleUrls: ['./view-log.page.scss'],
})
export class ViewLogPage implements OnInit {
  overnightSleepData:any = SleepService.AllOvernightData;
  storedOvernightSleep:any;
  storedSleepiness:any;
  stanfordSleepData:any = SleepService.AllSleepinessData;
  selection:string;
  overnightLog:any;
  sleepinessLog:any;
  num:number;
  sleepnum:number;

  constructor(public sleepService:SleepService,  public alertController:AlertController, private db: AngularFirestore) {

    this.num = 2;
    this.sleepnum = 1;
    this.storedOvernightSleep = this.db.collection('overnightDataLog').valueChanges();
    this.storedSleepiness = this.db.collection('sleepinessDataLog').valueChanges();
  }

  ngOnInit() {
    this.selection = "overnightsleep";
    this.overnightLog = {};
    this.sleepinessLog = {};
    this.createData();
    this.createSleepinessData();
    this.storeData();
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
           this.storedOvernightSleep = [];
           this.sleepService.clearOvernightSleepData();
           this.deleteDocs("overnightDataLog");
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
            this.storedSleepiness = [];
            this.sleepService.clearSleepinessData();
            this.deleteDocs("sleepinessDataLog");
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

    // map documentID for each obj in overnightsleep or standfordsleepiness
    createData(){
      let overnightLog = this.overnightSleepData.forEach(element => {
        this.overnightLog[`sleepData-${this.num}`] = {
          'sleep': element.summaryString(),
          'date': element.dateString(),
          'notes': element.noteString(),
          'rating': element.ratingString()
        };
        this.num++;
      });
    }

    createSleepinessData(){
      let sleepinessLog = this.stanfordSleepData.forEach(element => {
        this.sleepinessLog[`sleepData-${this.sleepnum}`] = {
          'loggedDate': element.dateString(),
          'loggedSleepiness': element.summaryString()
        };
        this.sleepnum++;
      });
    }

    // stores data in sleeptracker project database
    storeData(){
      for (let id in this.overnightLog){
        this.db.collection('overnightDataLog').doc(id).set({
          "sleepTime":this.overnightLog[id]['sleep'],
          "loggedTime":this.overnightLog[id]['date'],
          'notes': this.overnightLog[id]['notes'],
          'rating': this.overnightLog[id]['rating']
        });
      }

      for (let id in this.sleepinessLog){
        this.db.collection('sleepinessDataLog').doc(id).set({
          "loggedDate":this.sleepinessLog[id]['loggedDate'],
          "loggedSleepiness":this.sleepinessLog[id]['loggedSleepiness'],
        });
      }
  }

    // deletes logged data in sleeptracker database
    deleteDocs(name){
      this.db.collection(name).get().subscribe((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        this.db.collection(name).doc(doc.id).delete();
        });
      });
    }


}
