import { ToastrService } from 'ngx-toastr';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class LabService {
  private specList = new Subject();

  constructor(private http: HttpClient, private Toastr: ToastrService) {}

  getSpecList() {
    return this.specList.asObservable();
  }

  getSpecialityArray() {
    console.log("inside getSpecialityArray");
    this.http
      .post("http://localhost:8000/getSpecialities", {})
      .subscribe((response: any) => {
        console.log(JSON.stringify(response));
        this.specList.next(response.specialityArray);
      });
  }
  register(
    password,
    fname,
    lname,
    email,
    blood,
    dob,
    contact,
    address,
    user,
    licence,
    labname,
    DOE,
    lab_address,
    selectedItems
  ) {
    //console.log("in registershop");
    this.http
      .get(
        "http://localhost:8000/getUserId/" +
          fname +
          "/" +
          lname +
          "/" +
          user +
          "/" +
          dob
      )
      .subscribe((response: any) => {
        var userId = response.userId;
        this.http
          .post("http://localhost:8000/registeruser", {
            fname,
            lname,
            password,
            address,
            contact,
            dob,
            blood,
            email,
            user,
            userId
          })
          .subscribe((response: any) => {
            if (user == "lab") {
              this.http
                .post("http://localhost:8000/register", {
                  userId,
                  password,
                  fname,
                  lname,
                  email,
                  blood,
                  dob,
                  contact,
                  address,
                  user,
                  licence,
                  labname,
                  DOE,
                  lab_address,
                  selectedItems
                })
                .subscribe((response: any) => {
                  if (response.success) {
                    console.log("Inserted Successfully");
                    this.Toastr.success("Registration of  Lab successfull!!");
                  }
                });
            }
          });
      });
  }

  

}
