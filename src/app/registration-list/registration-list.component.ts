import { Component, OnInit } from '@angular/core';
import {Patient} from "../patient";
import {Registration} from "../registration";
import {RegistrationService} from "../registration.service";
import {Doctor} from "../doctor";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.css']
})
export class RegistrationListComponent implements OnInit {
  registrationFormTitle = 'Registracija į dermatologinę kliniką';
  selectDoctorFormTitle = 'Pasirinkite gydytoją';
  registrationDone = ''

  registrations: Registration[] | undefined;
  doctors: Doctor[] | undefined;
  patient: Patient[] | undefined;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
  this.getRegistrations()}

  private getRegistrations(): void {
    this.registrationService.getRegistrations().subscribe(
      (response:Registration[]) => {
        this.registrations = response;},
      (error :HttpErrorResponse) => {
        alert(error.message);
      });
  }

  public onUpdateRegistration(registration: Registration): void {
    this.registrationService.updateRegistration(registration)
      .subscribe(
        (response: Registration) => {
          // console.log(response);
          this.registrations = this.registrations?.map((reg)=>reg.id ===response.id ? response : reg)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onAddRegistration(registration: Registration): void {
    this.registrationService.addRegistration(registration)
      .subscribe(
        (response: Registration) => {
          // console.log(response);
          // @ts-ignore
          this.registrations = [...this.registrations, response]
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onDeleteRegistration(registrationId: number): void {
    this.registrationService.deleteRegistration(registrationId)
      .subscribe(
        (response: void) => {
          // console.log(response);
          // @ts-ignore
          this.registrations = this.registrations.filter((registration) =>registration.id !== registrationId)
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }


}
