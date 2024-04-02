import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cam',
  templateUrl: './cam.component.html',
  styleUrl: './cam.component.css'
})
export class CamComponent implements OnInit{
  constructor(private router:Router){

  }
  ngOnInit(): void {
    
  }
  goBack(){
    this.router.navigateByUrl("home");
  }
}
