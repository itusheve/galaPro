import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {HttpClient, HttpParams} from "@angular/common/http";
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {Socket} from 'ngx-socket-io';

export interface URLResponse {
  defaultURL:string;
}


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {



  private URL: string;
  private isRedirect:boolean= false;
  private textFromSocket;

  constructor(private socket : Socket,private alertController : AlertController,private iab :InAppBrowser, public navCtrl: NavController, public http:HttpClient) {

  }



  submit(){

      this.textFromSocket = undefined;
      this.socket.disconnect();

      this.http.get<URLResponse>('http://localhost:3000/getUrl',{params:new HttpParams().set('URL', this.URL).set('REDIRECT', '' +this.isRedirect)}).subscribe(result =>{
        console.log(result);
        const browserOptions = 'location="yes';
        let url;

        if(result.defaultURL){
          url = result.defaultURL;
        }
        else{
          url = this.URL;
        }

        this.iab.create(url.startsWith('http') ? url : 'http://' + url, '_blank', browserOptions);


    }, value => {

      if(value.error.listeningMode){
        this.socket.connect();

        this.socket.emit('originURL',this.URL);
        this.socket.on('url', (data) => {
          if(data === ''){
            this.showAlert('There isnt default URL in DB');
            this.socket.disconnect();
          } else {
            this.textFromSocket = data;
          }

        });
      } else {
       this.showAlert(value.error.error || 'No response from server!');
       this.socket.disconnect();
      }




    });
  }


  showAlert(msg){
    const alert = this.alertController.create({
      title: 'Error',
      message: msg,
      buttons: ['OK']
    });
    alert.present();
  }

}
