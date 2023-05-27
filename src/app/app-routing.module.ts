import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./pages/main-page/main-page.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {GradeViewComponent} from "./pages/grade-view/grade-view.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {path: '', component: MainPageComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: 'grade/:id', component: GradeViewComponent, canActivate:[AuthGuard]},
  {path: '**', redirectTo: 'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
