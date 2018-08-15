import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Usuario } from '../../app/entity/Usuario';

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
export class LoginPage {

  public usuario = new Usuario();

  constructor(public navCtrl: NavController, public navParams: NavParams, public loginService: LoginServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(): void {
    if (this.loginIsValid) {
      this.loginService.login(this.usuario.email, this.usuario.senha).subscribe(
        response => console.log(response)
      );
    } else {
      alert('E-mail ou senha incorreto!')
    }
  }

  loginIsValid(): boolean {
    if (this.usuario.email == undefined || this.usuario.email.trim.length <= 0) {
      alert('Preencha o E-mail')
      return false;
    }
    if (this.usuario.senha == undefined || this.usuario.senha.trim.length <= 0) {
      alert('Preencha a Senha')
      return false;
    }
    return true;
  }

}
