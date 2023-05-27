import {Component, ErrorHandler} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {catchError} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [{provide: ErrorHandler, useClass: ErrorHandler}]
})
export class LoginComponent {

  form = new FormGroup({
    email: new FormControl('',
      [
        Validators.required,
        Validators.minLength(3)
      ]),
    password: new FormControl('',
      [
        Validators.required,
        Validators.minLength(5)
      ]),
  });

  get email() {
    return this.form.controls.email as FormControl;
  }

  get password() {
    return this.form.controls.password as FormControl;
  }

  error: string = ''

  constructor(private authService: AuthService,
              private router: Router) {

  }

  login() {
    this.error = ''

    this.authService.login(
      {
        email: this.email.value, password: this.password.value
      }
    ).subscribe((data) => {
      if (data.error) {
        this.error = data.error.message
      }else{
        this.router.navigate(['/'])
      }
    })
  }
}
