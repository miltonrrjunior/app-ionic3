import { HomePage } from './../home/home';
import { CookieService } from 'ngx-cookie';
import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Usuario } from '../../app/entity/Usuario';

import { ToastController } from 'ionic-angular';
import { RequestOptions } from '@angular/http';

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
  providers: [LoginServiceProvider, CookieService]
})
export class LoginPage implements OnInit {

  public usuario = new Usuario();
  loading: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loginService: LoginServiceProvider,
    private toastCtrl: ToastController,
    private cookieService: CookieService,
    private requestOptions: RequestOptions) {
  }

  ngOnInit() {
    this.usuario = new Usuario();
  }

  ionViewDidLoad() {
  }

  login() {

    if (this.loginIsValid()) {
      this.loginService.login(this.usuario.email, this.usuario.senha).subscribe(
        res => this.loginSuccess(res)
      )
    } else {
      this.usuario = new Usuario();
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

  public loginSuccess(res: any) {
    this.cookieService.removeAll();
    this.cookieService.put("accessToken", res.access_token);
    this.requestOptions.headers.set('Authorization', "Bearer " + res.access_token);
    this.loginService.getUsuarioAtual(res.access_token).subscribe(
      res => this.redirectPage(res)
    );
  }

  public redirectPage(res: any) {
    this.cookieService.putObject("usuarioAtual", res);
    this.navCtrl.setRoot(HomePage);
  }

  redirectUser(response) {
    this.cookieService.removeAll();
    this.cookieService.put("accessToken", response.access_token);
    this.requestOptions.headers.set('Authorization', "Bearer " + response.access_token);
  }

}
