import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AddPrescriptionService } from "./add-prescription.service";
import { Subscribable, Subscription } from "rxjs";
@Component({
  selector: "app-add-prescription",
  templateUrl: "./add-prescription.component.html",
  styleUrls: ["./add-prescription.component.css"]
})
export class AddPrescriptionComponent implements OnInit {
  public hospital: String;
  public date: string;
  public dateD: Date;
  public maxTime: string;
  public time: String;
  public maxDateS: string;
  public medicines: any[] = [
    {
      name: "",
      douses: {
        morning: "",
        afternoon: "",
        night: ""
      },
      days: "",
      description: ""
    }
  ];

  constructor(
    private http: HttpClient,
    private _addPrescriptionService: AddPrescriptionService
  ) {}

  ngOnInit() {
    this._addPrescriptionService.getuser();

    this.date = this.formatDate(new Date());
    this.time = this.formatAMPM(new Date());
    this.maxDateS = this.formatDate(new Date());
    this.maxTime = this.formatAMPM(new Date());
    console.log("===>" + sessionStorage.getItem("uid"));
  }

  addMedicine() {
    this.medicines.push({
      name: "",
      douses: {
        morning: "",
        afternoon: "",
        night: ""
      },
      days: "",
      description: ""
    });
  }

  removeMedicine(i: number) {
    this.medicines.splice(i, 1);
  }

  async addPrescription() {
    this.dateD = new Date(this.date);
    var form = {
      hospital: this.hospital,
      date: this.dateD,
      time: this.time
    };
    console.log("At component:" + JSON.stringify(form));
    console.log("-->" + form.hospital + "-->" + form.date);
    this._addPrescriptionService.newPrescription(form, this.medicines);
  }

  currentTime() {
    this.time = this.formatAMPM(new Date());
  }

  today() {
    this.date = this.formatDate(new Date());
  }

  formatDate(date: Date) {
    var d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    hours = hours % 24;
    hours = hours ? hours : "0"; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;
    var strTime = hours + ":" + minutes;
    console.log("---time-->" + strTime);
    return strTime;
  }

  // mor(i: number) {
  //   if (this.chMor[i]) {
  //     this.medicines[i].douses.morning = 1;
  //   } else {
  //     this.medicines[i].douses.morning = 0;
  //   }
  // }
  // aft(i: number) {
  //   if (this.chAft[i]) {
  //     this.medicines[i].douses.afternoon = 1;
  //   } else {
  //     this.medicines[i].douses.afternoon = 0;
  //   }
  // }
  // nig(i: number) {
  //   if (this.chNig[i]) {
  //     this.medicines[i].douses.night = 1;
  //   } else {
  //     this.medicines[i].douses.night = 0;
  //   }
  // }
}
