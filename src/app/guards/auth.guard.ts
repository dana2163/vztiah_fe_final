import {Router} from '@angular/router';
import {Injectable} from "@angular/core";
import {JwtHelperService} from "@auth0/angular-jwt";
import {root} from "postcss";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private jwtHelper: JwtHelperService,
              private router: Router) {

  }

  canActivate() {

    const token = localStorage.getItem("token");

    if (!token && this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem("token")

      this.router.navigate(['/login'])
      return false
    }

    return true
  }
}
