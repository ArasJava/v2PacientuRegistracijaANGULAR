import {Component, OnInit} from '@angular/core';
import {PatientService} from "../patient.service";
import {Patient} from "../patient";
import {Doctor} from "../doctor";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

  public patients?: Patient[] | undefined;

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

  public onUpdatePatient(patient: Patient): void {
    this.patientService.updatePatient(patient)
      .subscribe(
        (response: Patient) => {
          // console.log(response);
          this.patients = this.patients?.map((pat)=>pat.id ===response.id ? response : pat)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onAddPatient(patient: Patient): void {
    this.patientService.addPatient(patient)
      .subscribe(
        (response: Patient) => {
          // console.log(response);
          // @ts-ignore
          this.patients = [...this.patients, response]
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onDeletePatient(patientId: number): void {
    this.patientService.deletePatient(patientId)
      .subscribe(
        (response: void) => {
          // console.log(response);
          // @ts-ignore
          this.patients = this.patients.filter((patient)=> patientId !== patientId)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

}
