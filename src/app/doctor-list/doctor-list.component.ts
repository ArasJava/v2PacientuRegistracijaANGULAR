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
    this.doctorService.getDoctor().subscribe(
      (response:Doctor[]) => {
        this.doctors = response;},
      (error :HttpErrorResponse) => {
        alert(error.message);
    });
  }
}
