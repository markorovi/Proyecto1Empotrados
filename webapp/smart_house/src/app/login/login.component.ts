import { Component, OnInit } from '@angular/core';
import { WebserviceService } from '../services/webservice.service';
import { Router } from '@angular/router';
import { LoginInterface } from '../models/login-interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private webserver:WebserviceService, private router:Router){

  }
  form:LoginInterface = {
    username:"",
    password: ""
  }
  ngOnInit(): void {
  }

  
  onLogin(username:string, password:string){
    this.form.username = username;
    this.form.password = password;
    
    this.webserver.login(this.form).subscribe(data =>{
      if(data.status == "200"){
          this.router.navigateByUrl("home");
      }else{
        console.log(data.response); //agregar validacion
      }
    });
  }

}
