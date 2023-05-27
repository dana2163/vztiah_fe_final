import {Component, Input} from '@angular/core';
import {IGrade} from "../../models/grade";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiGradeService} from "../../services/api/api-grade.service";
import {ApiAuthService} from "../../services/api/api-auth.service";
import {IUser} from "../../models/user";
import {IStudent} from "../../models/student";
import {ApiStudentService} from "../../services/api/api-student.service";


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {
  @Input() grades: IGrade[]
  user: IUser
  userStudents: IStudent[]

  form = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3)
      ]),
  });

  get name() {
    return this.form.controls.name as FormControl;
  }

  constructor(private apiGradeService: ApiGradeService, private apiAuthService: ApiAuthService,
              private apiStudentService: ApiStudentService) {
    this.apiAuthService.getCurrentUser().subscribe((user) => {
      this.user = user
      if (user.role === 'TEACHER') {
        this.allGrades()
      } else {
        this.apiStudentService.getUserStudents().subscribe((students) => {
          this.userStudents = students
        })
      }
    })

  }

  async allGrades() {
    await this.apiGradeService.getAllGrades().subscribe((allGrades) => {
      this.grades = allGrades
    })
  }

  async createGrade() {
    this.apiGradeService.createGrade({
      name: this.name.value
    }).subscribe((res: IGrade) => {
      this.name.setValue('')
      this.grades.push(res)
    })
  }
}
