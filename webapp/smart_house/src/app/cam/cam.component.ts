import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebserviceService } from '../services/webservice.service';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrl: './cam.component.css'
})
export class CamComponent implements OnInit{
  imageurl:string;
  constructor(private router:Router, private webService:WebserviceService){
    this.imageurl="";
  }
  ngOnInit(): void {
    this.getImage()

    setInterval(()=>{
      this.getImage();
    },3000)
  }
  goBack(){
    this.router.navigateByUrl("home");
  }
  getImage(){
    this.webService.getImage().subscribe(data =>{
      console.log(data.image)
      this.imageurl = 'data:image/jpeg;base64,' + data.image
    })
  }
}
