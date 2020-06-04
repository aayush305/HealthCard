import { LabService } from "./lab.service";
import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { RegisterService } from "../register.service";
import { ToastrService } from "ngx-toastr";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { Subscription } from "rxjs";

@Component({
  selector: "app-signup2",
  templateUrl: "./signup2.component.html",
  styleUrls: ["./signup2.component.css"],
})
export class Signup2Component implements OnInit {
  public fname: string;
  public lname: string;
  public password: string;
  public blood: string;
  public user: string;
  public dob: string;
  public userId: string;
  public address: string;
  public contact: string;
  public email: string;
  public selectedItems: any[];
  public dropdownList = [];
  public specialities: any[] = [
    {
      speciality: "",
    },
  ];

  private sub1: Subscription;
  public dropdownSettings: IDropdownSettings;

  constructor(
    private _route: ActivatedRoute,
    private router: Router,
    private Toastr: ToastrService,
    private register: RegisterService,
    private labService: LabService
  ) {}

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: "Full Blood Examination" },
      { item_id: 2, item_text: "Iron studies" },
      {
        item_id: 3,
        item_text: "TSH (Thyroid Stimulating Hormone) Quantification",
      },
      { item_id: 4, item_text: "Urinalysis" },
      { item_id: 5, item_text: "INR (International Normalized Ratio)" },
    ];
    this.selectedItems = [{ item_id: 1, item_text: "Full Blood Examination" }];
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      //  allowSearchFilter: true
    };

    var basicForm = history.state;
    console.log(JSON.stringify(basicForm));
    this.fname = basicForm.fname;
    this.lname = basicForm.lname;
    this.password = basicForm.password;
    this.address = basicForm.address;
    this.contact = basicForm.contact;
    this.blood = basicForm.blood;
    this.user = basicForm.user;
    this.email = basicForm.email;
    this.dob = basicForm.dob;
    this.address = basicForm.address;
    this.email = basicForm.email;
    this.contact = basicForm.contact;
    this.dropdownSettings = {
      singleSelection: false,
      idField: "item_id",
      textField: "item_text",
      selectAllText: "Select All",
      unSelectAllText: "UnSelect All",
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
    this.userId = this.fname + "_" + this.lname;
    this.labService.getSpecialityArray();
    this.sub1 = this.labService.getSpecList().subscribe((list: []) => {
      this.dropdownList = list;
    });

    // this.dropdownList = this.register.getSpecialityArray();
    // Uncomment after ready getId ready in register.service.ts
    // this.userId = this.register.getId(
    //   this.fname,
    //   this.lname,
    //   this.user,
    //   this.dob
    // );
  }

  registerLab(form) {
    console.log("signup 2 dob" + this.dob);
    var licence = form.licence.value;
    var labname = form.lab_name.value;
    var DOE = form.DOE.value;
    var lab_address = form.address.value;
    if (licence && labname && DOE && lab_address) {
      //  var l=form.l1.value;
      console.log("selected", this.selectedItems);
      //qvar contact = form.contact.value;
      //console.log(licence, shopname);
      this.labService.register(
        this.password,
        this.fname,
        this.lname,
        this.email,
        this.blood,
        this.dob,
        this.contact,
        this.address,
        this.user,
        licence,
        labname,
        DOE,
        lab_address,
        this.selectedItems
      );
      this.router.navigate(["/Login"]);
    } else {
      this.Toastr.error("All fields are mendetory!!");
    }
  }
  addSpeciality() {
    this.specialities.push({
      speciality: "",
    });
  }

  removeSpeciality(i: number) {
    this.specialities.splice(i, 1);
  }

  registerDoc(form) {
    this.specialities.forEach((spec) => {
      this.selectedItems.push(spec.speciality);
    });

    if (
      form.licence.value &&
      form.degree.value &&
      form.work_name.value &&
      form.work_contact.value &&
      form.work_address.value &&
      this.selectedItems &&
      this.specialities
    ) {
      this.register.registeDoc(
        this.fname,
        this.lname,
        this.password,
        this.address,
        this.contact,
        this.dob,
        this.blood,
        this.email,
        this.user,
        form.licence.value,
        form.degree.value,
        this.selectedItems,
        this.specialities,
        form.work_name.value,
        form.work_contact.value,
        form.work_address.value
      );
      this.router.navigate(["/Login"]);
    } else {
      this.Toastr.error("All fields are mendetory!!");
    }
  }
}
