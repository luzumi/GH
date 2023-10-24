import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import {BehaviorSubject,  Observable} from 'rxjs';

import {map} from "rxjs/operators";
import {AuthService} from "../auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//
//     return this.authService.checkAuthentication().pipe(
//       map(profile => {
//         if (profile && profile.id) { // Nehmen wir an, `id` ist ein Feld im Profil
//           return true;
//         } else {
//           this.router.navigate(['/login']);
//           return false;
//         }
//       }),
//       catchError(err => {
//         // Wenn ein Fehler auftritt, navigieren Sie zur Login-Seite
//         this.router.navigate(['/login']);
//         return of(false);
//       })
//     );
//   }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('AuthGuard#canActivate called');

    return (this.authService.isAuthenticated as unknown as BehaviorSubject<boolean>).asObservable().pipe(
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      })
    );
  }




}