import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { Signup2Component } from "./signup2/signup2.component";
import { PatientHomeComponent } from "./Patient/patient-home/patient-home.component";
import { PatientGuard } from "./Gaurds/patient.guard";
import { AddPrescriptionComponent } from "./add-prescription/add-prescription.component";
import {UploadreportComponent} from './uploadreport/uploadreport.component';
import { DoctorGuard } from './Gaurds/Docter/doctor.guard';
import { LabGuard } from './Gaurds/Lab/lab.guard';

const routes: Routes = [
  { path: "Login", component: LoginComponent },
  { path: "Signup", component: SignupComponent },
  { path: "Signup2", component: Signup2Component },
  {
    path: "Patient/Home",
    component: PatientHomeComponent,
    canActivate: [PatientGuard]
  },
  { path: "Prescription", component: AddPrescriptionComponent ,canActivate:[DoctorGuard]},
  { path: "upload", component: UploadreportComponent, canActivate:[LabGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
