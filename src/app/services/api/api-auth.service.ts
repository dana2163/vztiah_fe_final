import {Injectable} from '@angular/core';
import {CreateUserDto} from "../../models/dto/create-user.dto";
import {HttpClient} from "@angular/common/http";
import {IUser} from "../../models/user";
import {environment} from '../../../environments/environment';
import {LoginUserDto} from "../../models/dto/login-user.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  constructor(private http: HttpClient) {
  }

  login(userDto: LoginUserDto) {
    return this.http.post(`${environment.apiUrl}/auth/login`, userDto);
  }

  register(userDto: CreateUserDto) {
    return this.http.post<CreateUserDto>(`${environment.apiUrl}/auth/registration`, userDto)
  }

  getCurrentUser() {
    return this.http.get<IUser>(`${environment.apiUrl}/auth/current`);
  }

  saveUser(user : IUser){
    return this.http.post<IUser>(`${environment.apiUrl}/users/save`, user)
  }
}
