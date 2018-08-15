import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Usuario } from '../../app/entity/Usuario';

import { ToastController } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LoginServiceProvider]
})
export class LoginPage implements OnInit {

  public usuario = new Usuario();

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService: LoginServiceProvider, private toastCtrl: ToastController) {
  }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {

    if (this.loginIsValid()) {
      this.loginService.login(this.usuario.email, this.usuario.senha).subscribe(
        response => console.log(response)
      );
    }
  }

  loginIsValid(): boolean {
    if (this.usuario.email == undefined) {
      this.showMessage('Preencha o campo e-mail!', 'warning')
      return false;
    }
    if (this.usuario.senha == undefined) {
      this.showMessage('Preencha o campo senha!', 'warning')
      return false;
    }
    return true;
  }

  showMessage(message: string, type: string) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      cssClass: 'toast-' + type
    });

    toast.present();
  }

}
