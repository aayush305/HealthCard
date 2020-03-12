import { Router } from '@angular/router';

import { UploadreportService } from './../../../Lab/uploadreport/uploadreport.service';
import { ViewPrescriptionService } from './../view-prescription.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-view-prescription',
  templateUrl: './view-prescription.component.html',
  styleUrls: ['./view-prescription.component.css']
})
export class ViewPrescriptionComponent implements OnInit {
  public images = [];
  public user;
  public obj;
  private alluser:Subscription;
  private _flag = false;
  public users:any;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};
  temp =[] 
  selected:any;
  keyword = 'name';
  private __flag = false
  private dataSubscription:Subscription
  private btnClick = 0;
  private responsedData: any;
  private responsedData1: any
  private columnDefs = [];
  private rowData: any = [];
  private keys = [];
  private objectKeys = Object.keys;
  private values: any = [];
  private stringres: string;
  constructor(private viewPrescriptionService: ViewPrescriptionService, private _uploadReportService: UploadreportService,
    private router: Router) { }
  private wholeSubscription:Subscription
  ngOnInit() {
    this._uploadReportService.getuser();
    this.alluser = this._uploadReportService.cast9Listener()
    .subscribe(data => {
      
      this.obj = data
      this.users = JSON.parse(this.obj)
      var x=0
      this.users.forEach(element => {
        //this.temp.push(element.email)
        this.temp.push({id:(x+1),name:element.userId + " | (" + element.firstname + " " + element.lastname + ")"})
        console.log("proo"+element.email)

      });
      //var u=this.users[0]
      console.log(this.temp)
    })
    this.viewPrescriptionService.getDocsUsersPrescriptions(sessionStorage.getItem('uid'))
    this.wholeSubscription = this.viewPrescriptionService.getWholeUserObject().subscribe((res:any)=>{
      this.responsedData1 = res
      this.keys = Object.keys(res[0]);
      this.values = Object.values(res);
      for (let i = 0; i < this.keys.length; i++) {
        // console.log(this.keys[i])
        this.columnDefs.push({ header: this.keys[i], field: this.keys[i] });
      }
      this.rowData.push(...res);
      this.__flag = true
      this._flag = true
    })
    // this.users = JSON.parse(this.obj)
  }
  
  selectEvent(item) {
    this.selected=item;
    // do something with selected item
  }
 
  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e){
    console.log(e);
    // do something when input is focused
  }

  onSubmit(form: NgForm) {
    this._flag = true
    this.btnClick +=1
    if(this.btnClick > 1) {
      this.rowData = []
      this.columnDefs = []
      this.dataSubscription.unsubscribe()
    }
    var x=this.selected.name;
    var y=x.split(" ",1);
    this.viewPrescriptionService.getPrescription(y)
    this.dataSubscription = this.viewPrescriptionService.getUserSubject().subscribe((res:any) => {
      this.responsedData = res
      this.stringres = JSON.stringify(res)
      this.keys = Object.keys(res[0]);
      this.values = Object.values(res);
      for (let i = 0; i < this.keys.length; i++) {
        // console.log(this.keys[i])
        this.columnDefs.push({ header: this.keys[i], field: this.keys[i] });
      }
      this.stringres = JSON.stringify(res.medicines)
      console.log(this.stringres)
      this.rowData.push(...res);
      console.log(...this.rowData)
    })

   
    console.log(y[0]);
  }
  onClick(id: string) {
    console.log('PRESID',id)
    this.router.navigate(['/detailedPrescription'], {queryParams: {id: id}})
  }

}