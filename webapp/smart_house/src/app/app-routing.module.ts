import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LightsComponent } from './lights/lights.component';
import { HomeComponent } from './home/home.component';
import { CamComponent } from './cam/cam.component';

const routes: Routes = [
  {path: "login", component:LoginComponent},
  {path:"lights-doors", component:LightsComponent},
  {path:"home", component:HomeComponent},
  {path:"cam", component:CamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
