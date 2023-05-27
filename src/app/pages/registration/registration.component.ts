import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {catchError} from "rxjs";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  form = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.email
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5)
      ]),
    isTeacher: new FormControl(false)
  });

  error : string = ''

  get email() {
    return this.form.controls.email as FormControl;
  }

  get password() {
    return this.form.controls.password as FormControl;
  }
  get isTeacher() {
    return this.form.controls.isTeacher as FormControl;
  }


  constructor(private authService: AuthService) {

  }

  registration(){
    this.error = ''

    this.authService.register(
      {
        email: this.email.value, password: this.password.value,
        teacher: this.isTeacher.value
      }
    ).pipe(
      catchError((err : any) => {
        this.error = err.error.message
        return err.error.message
      })
    ).subscribe()
  }

}
