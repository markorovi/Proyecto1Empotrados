import { Component, OnInit } from '@angular/core';
import { LightsInterface } from '../models/lights-interface';
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

  constructor(private webService:WebserviceService, private router:Router){
    this.lights=[];
    this.doors=[];
  };
  


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

  changelights(i:number){
    if (this.lights[i].status=="off"){
      this.lights[i].status="on";
    }else{
      this.lights[i].status="off";
    }
  }
}
