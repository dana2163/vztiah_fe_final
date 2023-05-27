import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiGradeService} from "../../services/api/api-grade.service";
import {IGrade} from "../../models/grade";
import {waitForAsync} from "@angular/core/testing";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ApiStudentService} from "../../services/api/api-student.service";
import {CreateStudentDto} from "../../models/dto/create-student.dto";
import {ApiUserService} from "../../services/api/api-user.service";
import {map} from "rxjs";
import {ApiAuthService} from "../../services/api/api-auth.service";

@Component({
  selector: 'app-grade-view',
  templateUrl: './grade-view.component.html',
  styleUrls: ['./grade-view.component.css']
})
export class GradeViewComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    parentEmail: new FormControl('')
  });

  get name() {
    return this.form.controls.name as FormControl;
  }

  get surname() {
    return this.form.controls.surname as FormControl;
  }

  get parentEmail() {
    return this.form.controls.parentEmail as FormControl;
  }

  grade: IGrade
  parentNotFoundMessage: string
  id: number;
  private sub: any;

  constructor(private activeRoute: ActivatedRoute, private apiGradeService: ApiGradeService,
              private apiStudentService: ApiStudentService,
              private apiUserService: ApiUserService, private apiAuthService: ApiAuthService,
              private router : Router) {
  }

  createStudent() {

    this.apiUserService.findUserByEmail(this.parentEmail.value).subscribe(data => {
      this.parentNotFoundMessage = ''

      if (data !== null) {
        this.apiStudentService.createStudent({
          name: this.name.value,
          surname: this.surname.value,
          parentId: data.id
        }, this.id).subscribe(() => {
          this.getGrade()

          this.name.setValue('')
          this.surname.setValue('')
          this.parentEmail.setValue('')
        })
      } else {
        this.parentNotFoundMessage = 'Parent`s email was not found'
      }
    })

  }

  getGrade() {
    this.apiGradeService.getGradeById(this.id).subscribe((grade) => {
      this.apiAuthService.getCurrentUser().subscribe((user) => {
        if (grade.teacher.id === user.id) {
          this.grade = grade
        } else {
          this.router.navigate(['/'])
        }
      })
    })
  }

  ngOnInit() {
    this.sub = this.activeRoute.params.subscribe((params: any) => {
      this.id = +params['id'];
    });

    this.getGrade()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
