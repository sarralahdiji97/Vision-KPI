import { Injectable } from '@angular/core';
import { Login, LoginSuccess, mapToProfile, Profile } from '../../models/client/profile';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, map, Observable, of, throwError } from 'rxjs';
import { BaseHttpService } from '../base-http-service/base-http.service';
import { EventService } from '../event-service/event-service.service';
import { ResponseApi } from '../../models/client/ResponseApi';
import { LocalStorageKeys } from '../../enums/general.enum';
import { UserServicesURL } from '../../enums/services-url.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthentificationSerivce {
private profileSubject = new BehaviorSubject<Profile | null>(null);

public profile$ = this.profileSubject.asObservable();
  constructor(
    private baseHttpService: BaseHttpService,
    private eventService: EventService,
    private http: HttpClient,
  ) { }

  
  // Get "api/profile"
public getProfile(): Observable<Profile> {

  if (this.profileSubject.value) {
    return this.profileSubject.asObservable() as Observable<Profile>;
  }

  return this.loadProfileFromAPI();
}

 public loadProfileFromAPI(): Observable<Profile> {
  console.log('Chargement profil depuis API');

  return this.http
    .get<Profile>(`/Data/api${UserServicesURL.Profile}`)
    .pipe(
      map((res) => {
        const profile = mapToProfile(res);
        this.profileSubject.next(profile);
        return profile;
      }),
       catchError((error: ResponseApi) => {
        console.log('Erreur profil', error);
        return throwError(() => error.message);
      })
    );
}
  // Authentification  "/UserAuth/login"
  public login(login: Login): Observable<any> {
  return this.baseHttpService
    .post<ResponseApi>(UserServicesURL.Authentification, {
      payload: login,
    })
    .pipe(
      map((res) => {
        if (res.success) {

          const loginSuccess: LoginSuccess = res.data;

          let profile: Profile | null = null;

          if (loginSuccess.user) {
            profile = mapToProfile(loginSuccess.user);

            // mettre à jour le profil pour toute l'application
            this.profileSubject.next(profile);

            this.eventService.isLoggedIn.next(true);
          }

          localStorage.setItem(
            LocalStorageKeys.TOKEN,
            loginSuccess.token
          );

          localStorage.removeItem(
            LocalStorageKeys.GRID_FILTER + '-' + profile?.id
          );

          return {
            profile: profile,
            success: true
          };

        } else {
          return {
            profile: null,
            success: false
          };
        }
      }),
      catchError((error: ResponseApi) =>
        throwError(() => error.message)
      )
    );
}
  // Register "/UserAuth/register"
  public register(newLogin: Login): Observable<boolean> {
    return this.baseHttpService
      .post(UserServicesURL.Register, { payload: newLogin })
      .pipe(
        map((data) => {
          localStorage.removeItem(LocalStorageKeys.TOKEN);
          return true;
        }),
        catchError((error: ResponseApi) => throwError(() => error.message))
      );
  }

public logOut() {
  localStorage.removeItem(LocalStorageKeys.TOKEN);

  this.profileSubject.next(null);

  this.eventService.isLoggedOut.next(true);
}
}
