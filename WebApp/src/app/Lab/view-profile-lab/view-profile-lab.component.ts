import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { RegisterService } from "src/app/register.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-view-profile-lab',
  templateUrl: './view-profile-lab.component.html',
  styleUrls: ['./view-profile-lab.component.css']
})
export class ViewProfileLabComponent implements OnInit {

  public userData: JSON;
  public lab: JSON;
  constructor(
    private http: HttpClient,
    private router: Router,
    private register: RegisterService
  ) {}


  ngOnInit() {
    
    this.http
      .get(
        this.register.registerUrl +
          "/commonUserData/" +
          sessionStorage.getItem("uid")
      )
      .subscribe((res: any) => {
        this.userData = res.userData;
      });
    this.http
      .get(
        this.register.registerUrl + "/labdata/" + sessionStorage.getItem("uid")
      )
      .subscribe((res: any) => {
        
        this.lab = res.labdata;
      });
  }
  }


