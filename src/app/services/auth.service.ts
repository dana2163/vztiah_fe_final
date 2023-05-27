import {Injectable} from '@angular/core';
import {catchError, map, of, tap} from "rxjs";
import {ApiAuthService} from "./api/api-auth.service";
import {CreateUserDto} from "../models/dto/create-user.dto";
import {Router} from "@angular/router";
import {LoginUserDto} from "../models/dto/login-user.dto";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private apiAuthService: ApiAuthService,
              private router: Router) {
  }

  login(userDto: LoginUserDto) {
    return this.apiAuthService.login(userDto).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.accessToken);
      }),
      catchError((err) => of(err))
    );
  }

  register(userDto: CreateUserDto) {

    return this.apiAuthService.register(userDto).pipe(
      tap((response: any) => {
          this.router.navigate(['/login'])
        }
      ))
  }

}
