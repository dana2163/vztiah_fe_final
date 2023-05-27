import {Component, Input} from '@angular/core';
import {IUser} from "../../models/user";
import {ApiAuthService} from "../../services/api/api-auth.service";
import {ApiUserService} from "../../services/api/api-user.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  @Input() user: IUser

  form = new FormGroup({
    name: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2)
      ]),
    surname: new FormControl('',
      [
        Validators.required,
        Validators.minLength(2)
      ]),
  });

  get name() {
    return this.form.controls.name as FormControl;
  }

  get surname() {
    return this.form.controls.surname as FormControl;
  }

  constructor(private apiAuthService : ApiAuthService) {
    apiAuthService.getCurrentUser().subscribe((currentUser) => {
      this.user = currentUser
      this.name.setValue(this.user.name)
      this.surname.setValue(this.user.surname)
    })
  }

  saveUser(){
    this.apiAuthService.saveUser({
      id: this.user.id,
      email: this.user.email,
      name: this.name.value,
      surname: this.surname.value,
      password: this.user.password,
      role: this.user.role
    }).subscribe((data) => {

    })
  }
}
