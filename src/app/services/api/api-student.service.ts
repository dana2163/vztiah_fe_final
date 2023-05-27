import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IGrade} from "../../models/grade";
import {environment} from "../../../environments/environment";
import {CreateStudentDto} from "../../models/dto/create-student.dto";
import {IStudent} from "../../models/student";

@Injectable({
  providedIn: 'root'
})
export class ApiStudentService {

  constructor(private http: HttpClient) {
  }

  createStudent(dto: CreateStudentDto, gradeId : number) {
    return this.http.post(`${environment.apiUrl}/grades/${gradeId}`, dto);
  }

  getUserStudents() {
    return this.http.get<IStudent[]>(`${environment.apiUrl}/parents`);
  }
}
