import { URL_API } from './../../app/utils/Utils';
import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {
  private loginUrl: string;
  private usuarioUrl: string; //retorna o usuario logado
  public handleError: any;

  constructor(public http: Http) {
  }

  login(email: string, senha: string): Observable<any> {

    this.loginUrl = `${URL_API}/oauth/token?grant_type=password&username=` + email + "&password=" + encodeURIComponent(senha);

    let headers = new Headers({
      "Authorization": "Basic " + btoa("mobile" + ':' + "123")
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl, {}, options)
      .map(res => res.json());
  }

  public getUsuarioAtual(token: any) {

    this.usuarioUrl = `${URL_API}/usuario/logado`;

    let headers = new Headers({ 'Authorization': "Bearer " + token });

    let options = new RequestOptions({ headers: headers });

    return this.http.get(this.usuarioUrl, options)
      .map(res => res.json());
  }

}
