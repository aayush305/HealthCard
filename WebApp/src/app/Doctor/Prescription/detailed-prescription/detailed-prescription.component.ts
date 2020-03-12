import { Subscription } from 'rxjs';
import { ViewPrescriptionService } from './../view-prescription.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailed-prescription',
  templateUrl: './detailed-prescription.component.html',
  styleUrls: ['./detailed-prescription.component.css']
})
export class DetailedPrescriptionComponent implements OnInit {
  private param1: any;
  private responsedData: any;
  constructor(private route: ActivatedRoute, private viewPrescriptionService: ViewPrescriptionService) { }
  private dataSubscription: Subscription
  ngOnInit() {
    this.param1 = this.route.snapshot.queryParamMap.get('id')
    console.log('PARAM', this.param1)
    this.viewPrescriptionService.getDetailedPrescription(this.param1)
    this.dataSubscription = this.viewPrescriptionService.getDetailedSub().subscribe((res:any) => {
      this.responsedData = res
      console.log(this.responsedData)
    })

  }

}
