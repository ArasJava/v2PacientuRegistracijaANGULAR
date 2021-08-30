import {Component, OnInit} from '@angular/core';
import {Doctor} from "../doctor"
import {DoctorService} from "../doctor.service";
import {HttpErrorResponse} from "@angular/common/http";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit {


  doctors: Doctor[] | undefined;

  constructor(private doctorService: DoctorService) {
  }

  ngOnInit(): void {
    this.getDoctors();

    // Lokalus duomenys testavimui
    // this.doctors = [
    //   {
    //     "id": 1,
    //     "doctorName": "Pirmas Pirmaitis",
    //     "doctorSpecialization": "Dermatologas"
    //   },
    //   {
    //     "id": 2,
    //     "doctorName": "Antras Antraitis",
    //     "doctorSpecialization": "Chirurgas"
    //   }];
  }

  private getDoctors(): void {
    this.doctorService.getDoctors().subscribe(
      (response:Doctor[]) => {
        this.doctors = response;},
      (error :HttpErrorResponse) => {
        alert(error.message);
    });
  }

  public onUpdateDoctor(doctor: Doctor): void {
    this.doctorService.updateDoctor(doctor)
      .subscribe(
        (response: Doctor) => {
          // console.log(response);
          this.doctors = this.doctors?.map((doc)=>doc.id ===response.id ? response : doc)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onAddDoctor(doctor: Doctor): void {
    this.doctorService.addDoctor(doctor)
      .subscribe(
        (response: Doctor) => {
          // console.log(response);
          // @ts-ignore
          this.doctors = [...this.doctors, response]
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onDeleteDoctor(doctorId: number): void {
    this.doctorService.deleteDoctor(doctorId)
      .subscribe(
        (response: void) => {
          // console.log(response);
          // @ts-ignore
          this.doctors = this.doctors.filter((doctor)=>doctor.id !== doctorId)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

}
