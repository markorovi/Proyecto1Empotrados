import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../models/login-interface';
import { ResponseInterface } from '../models/response-interface';
import { Image } from '../models/image';
import { LightsInterface } from '../models/lights-interface';
import { DoorsInterface } from '../models/doors-interface';

@Injectable({
  providedIn: 'root'
})
export class WebserviceService {

  constructor(private http:HttpClient) { }


  url:string = "http://localhost:3000/";
  loginpath:string = this.url + "login";
  getimagepath:string =this.url + "cam";
  change_light_path:string = this.url + "lights";
  doorspath:string = this.url +"doors";

  login(form: LoginInterface){
    return this.http.post<ResponseInterface>(this.loginpath,form);
  }

  change_light(form: any){
    return this.http.post<any>(this.change_light_path,form)
  }

  get_door_status(){
    return this.http.get<DoorsInterface[]>(this.doorspath)
  }

  getImage(){
    console.log(this.getimagepath)
    return this.http.get<Image>(this.getimagepath);
  }
}
