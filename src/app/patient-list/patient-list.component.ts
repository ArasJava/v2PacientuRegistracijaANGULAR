import {Component, OnInit} from '@angular/core';
import {PatientService} from "../patient.service";
import {Patient} from "../patient";
import {Doctor} from "../doctor";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] | undefined;

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.getPatients();
  }

  private getPatients(): void {
    this.patientService.getPatients().subscribe(
      (response:Patient[]) => {
        this.patients = response;},
      (error :HttpErrorResponse) => {
        alert(error.message);
      });
  }
}
