import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { WebserviceService } from '../services/webservice.service';
import { LoginI } from '../models/login-i';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  constructor(private webserver:WebserviceService, private router:Router){

  }
  form:LoginI = {
    username:"",
    password: ""
  }
  ngOnInit(): void {
  }

  onLogin(username:string, password:string){
    this.form.username = username;
    this.form.password = password;
    
    this.webserver.login(this.form).subscribe(data =>{
      console.log(data);
    });
  }

}
