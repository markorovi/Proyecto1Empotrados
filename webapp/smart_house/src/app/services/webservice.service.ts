import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginI } from '../models/login-i';
import { ResponseI } from '../models/response-i';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private http:HttpClient) { }


  url:string = "http://localhost:3000/";
  loginpath:string = this.url + "login";

  login(form: LoginI){
    return this.http.post<ResponseI>(this.loginpath,form);
  }
}
