import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../models/login-interface';
import { ResponseInterface } from '../models/response-interface';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private http:HttpClient) { }


  url:string = "http://localhost:3000/";
  loginpath:string = this.url + "login";

  login(form: LoginInterface){
    return this.http.post<ResponseInterface>(this.loginpath,form);
  }
}
