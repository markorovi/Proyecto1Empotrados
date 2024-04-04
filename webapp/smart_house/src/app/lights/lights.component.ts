import { Component, OnInit } from '@angular/core';
import { LightsInterface } from '../models/lights-interface';
import { LightsManagementInterface } from '../models/lights-management-interface';
import { DoorsInterface } from '../models/doors-interface';
import { WebserviceService } from '../services/webservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lights',
  templateUrl: './lights.component.html',
  styleUrl: './lights.component.css'
})
export class LightsComponent implements OnInit {
  lights:LightsInterface[];
  doors:DoorsInterface[];
  form: LightsManagementInterface;

  constructor(private webService:WebserviceService, private router:Router){
  
    this.lights=[];
    this.doors=[];
    this.form = {id: 0, value: 0};
  }
  
  
 
  ngOnInit(): void {
    this.doors=[
      {
        place: "Front door",
        status: "close"
      },
      {
        place: "Back door",
        status: "close"
      },
      {
        place: "Room 1 door",
        status: "close"
      },
      {
        place: "Room 2 door",
        status: "close"
      }
    ]
    this.lights=[
      {
        place: "room 1",
        status: "off"
      },
      {
        place: "room 2",
        status: "off"
      },
      {
        place: "Living Room",
        status: "off"
      },
      {
        place: "Dinning Room",
        status: "off"
      },
      {
        place: "Kitchen",
        status: "off"
      }
    ]
  }

  goback(): void{
    this.router.navigateByUrl('home');
  }

  getDoorStatus(){
    this.webService.get_door_status().subscribe(data =>{
      this.doors = data
    })
  }

  getCorrectIndex(i:number){
    if (i ==0){
      return this.changelights(i,2)
    }else if(i == 1){
      return this.changelights(i,3)
    }else if(i == 2){
      return this.changelights(i,4)
    }else if(i == 3){
      return this.changelights(i,17)
    }else{
      return this.changelights(i,27)
    }
  }

  changelights(i:number, pin:number){
    if (this.lights[i].status=="off"){
      this.lights[i].status="on";
      this.form.id = pin;
      this.form.value = 1;
    }else{
      this.lights[i].status="off";
      this.form.id = pin;
      this.form.value = 0;
    }
      console.log(this.form);
      this.webService.change_light(this.form);
  }
}

