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
  registrationDone = ''

  public editRegistration?: Registration;
  public deleteRegistration?: Registration;
  public registrations?: Registration[] | undefined;


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

  public onOpenModal(registration: Registration, mode: string): void{
    const container = document.getElementById('main-container')
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add'){
      button.setAttribute('data-target', '#addRegistrationModal');
    }
    if (mode === 'addDoctor'){
      button.setAttribute('data-target', '#addRegistrationModal');
    }
    // if (mode === 'workTime'){
    //   this.editEmployee = employee;
    //   button.setAttribute('data-target', '#workTimeModal');
    // }
    if (mode === 'edit'){
      this.editRegistration = registration;
      button.setAttribute('data-target', '#updateRegistrationModal');
    }
    if (mode === 'delete'){
      this.deleteRegistration = registration;
      button.setAttribute('data-target', '#deleteRegistrationModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
