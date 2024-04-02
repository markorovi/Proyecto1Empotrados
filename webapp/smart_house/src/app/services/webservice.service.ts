import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../models/login-interface';
import { ResponseInterface } from '../models/response-interface';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private http:HttpClient) { }


  url:string = "http://localhost:3000/";
  loginpath:string = this.url + "login";
  getimagepath:string =this.url + "cam";

  login(form: LoginInterface){
    return this.http.post<ResponseInterface>(this.loginpath,form);
  }

  getImage(){
    console.log(this.getimagepath)
    return this.http.get<Image>(this.getimagepath);
  }
}
