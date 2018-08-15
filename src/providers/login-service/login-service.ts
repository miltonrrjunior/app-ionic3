import { Injectable } from '@angular/core';
import { URL_ARI } from '../../app/utils/Utils';
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
  public handleError: any;

  constructor(public http: Http) {
  }

  login(email: string, senha: string): Observable<any> {

    this.loginUrl = "http://localhost:8080/oauth/token?grant_type=password&username=" + email + "&password=" + encodeURIComponent(senha);
    let headers = new Headers({
      "Authorization": "Basic " + btoa("mobile" + ':' + "123")
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.loginUrl, {}, options)
      .map(res => res.json());
  }


}
