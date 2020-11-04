import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserGuard } from './guards/user.guard';
import { GenericGuard } from './guards/generic.guard';

const routes: Routes = [
  {path:'search', component: SearchComponent, canActivate: [UserGuard]},
  {path:'user/:username', component: UserComponent, canActivate: [UserGuard]},
  {path:'login', component: LoginComponent, canActivate: [GenericGuard]},
  {path:'signup', component: SignupComponent, canActivate: [GenericGuard]},
  {path:'**', redirectTo:'/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
