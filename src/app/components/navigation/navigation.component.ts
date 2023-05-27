import {Component} from '@angular/core';
import {ApiAuthService} from "../../services/api/api-auth.service";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  constructor(private apiAuth: ApiAuthService) {
  }

  logOut() {
    localStorage.removeItem('token')
  }

  protected readonly localStorage = localStorage;
}
