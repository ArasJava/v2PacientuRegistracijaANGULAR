import {Component, OnInit} from '@angular/core';
import {PatientService} from "../patient.service";
import {Patient} from "../patient";
import {Doctor} from "../doctor";
import {HttpErrorResponse} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {

   public patients?: Patient[] ;
   public editPatient?: Patient;
   public deletePatient?: Patient;

  constructor(private patientService: PatientService) {
  }

  ngOnInit(): void {
    this.getPatients();
  }




  submit() {
    console.log("Form Submitted")
    // console.log(this.contactForm.value)
  }



  public getPatients(): void {
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
           console.log(response);
          // @ts-ignore
          this.patients = [...this.patients, response]
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onDeletePatient(patientId: number): void {
    console.log(patientId)
    this.patientService.deletePatient(patientId)
      // .pipe(takeUntil(this.destroy&))
      .subscribe(
        (response: void) => {
           console.log(response);
          // @ts-ignore
          this.patients = this.patients.filter((patient)=> patient.id !== patientId)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  // public searchPatients(key: string): void {
  //   console.log(key);
  //   const results: Patient[] = [];
  //   for (const patient of this.patients) {
  //     if (patient.firstName.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //       || patient.lastName.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //       || patient.dateOfBirth.toLowerCase().indexOf(key.toLowerCase()) !== -1
  //       || patient.telephoneNumber.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
  //       results.push(patient);
  //     }
  //   }
  //   this.patients = results;
  //   if (results.length === 0 || !key) {
  //     this.getPatients();
  //   }
  // }

  public onOpenModal(patient: Patient, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addPatientModal');
    }
    if (mode === 'addDoctor'){
      button.setAttribute('data-target', '#addDoctorModal');
    }
    if (mode === 'workTime'){
      this.editPatient = patient;
      button.setAttribute('data-target', '#workTimeModal');
    }
    if (mode === 'edit'){
      this.editPatient = patient;
      button.setAttribute('data-target', '#updatePatientModal');
    }
    if (mode === 'delete'){
      this.deletePatient = patient;
      button.setAttribute('data-target', '#deletePatientModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
