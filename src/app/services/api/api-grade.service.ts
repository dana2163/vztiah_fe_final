import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {IGrade} from "../../models/grade";
import {CreateGradeDto} from "../../models/dto/create-grade.dto";

@Injectable({
  providedIn: 'root'
})
export class ApiGradeService {

  constructor(private http: HttpClient) {
  }

  getAllGrades() {
    return this.http.get<IGrade[]>(`${environment.apiUrl}/grades`);
  }

  createGrade(dto : CreateGradeDto){
    return this.http.post<IGrade>(`${environment.apiUrl}/grades`, dto)
  }

  getGradeById(gradeId : number){
    return this.http.get<IGrade>(`${environment.apiUrl}/grades/${gradeId}`)
  }
}
