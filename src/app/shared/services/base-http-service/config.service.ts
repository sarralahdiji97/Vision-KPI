import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AppConfig } from '../../models/client/app-config';


@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public _baseUrl: string | undefined;
  constructor(private http: HttpClient) {}

  /******Read Config.json*******/

  public getBaseUrl(): Observable<any> {
    if (this._baseUrl) {
      return new Observable((observer) => {
        observer.next(this._baseUrl);
      });
    }
    return this.http.get('./assets/config/app-config.json').pipe(
      map((res: AppConfig) => {
        return res.api;
      })
    );
  }
}
