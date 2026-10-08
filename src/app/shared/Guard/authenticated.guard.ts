import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthentificationSerivce } from '../services/authentification-service/authentification-serivce';

@Injectable({
  providedIn: 'root',
})
export class AuthenticatedGuard  {
  constructor(
    private authService : AuthentificationSerivce
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      return this.authService.loadProfileFromAPI().pipe(
        map((profile) => {
          if (profile) {
            return true;
          }
          return false;
        })
      );
  }
}
