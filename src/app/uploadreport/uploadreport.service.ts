import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadreportService {
  private listusers = new Subject<any>();
  public alluser: any;

  constructor(private http: HttpClient, private Toastr: ToastrService) { }
  
  uploadreport(fd, selected) {
    console.log("selected item", selected);

    this.http
      .post("http://localhost:8000/upload/" + selected.name, { fd })
      .subscribe((response: any) => {
        if (response.success) {
          console.log("Inserted Successfully");
          this.Toastr.success("Report Uploaded!!");
        }
      });
  }
  cast9Listener() {
    return this.listusers.asObservable();
  }
  getuser() {
    this.http
      .get("http://localhost:8000/getusers/")
      .subscribe((response: any) => {
        this.alluser = JSON.stringify(response.alluser);
        this.listusers.next(this.alluser);
        console.log("Users:", this.alluser);
      });
  }
}
