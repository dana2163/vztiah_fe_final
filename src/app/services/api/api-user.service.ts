import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IUser} from "../../models/user";

@Injectable({
  providedIn: 'root'
})
export class ApiUserService {
  constructor(private http: HttpClient) {
  }

  findUserByEmail(email : string){
    return this.http.post<IUser>(`${environment.apiUrl}/users/findByEmail`, email)
  }
}
