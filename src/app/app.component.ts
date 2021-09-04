import {Component} from '@angular/core';
import {Patient} from "./patient";
import {HttpErrorResponse} from "@angular/common/http";
import {Doctor} from "./doctor";
import {RegistrationService} from "./registration.service";
import {Registration} from "./registration";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
public doctors?: Doctor[];
public registration? :Registration[];

  registrationFormTitle = 'Registracija į dermatologinę kliniką';
  selectDoctorFormTitle = 'Pasirinkite gydytoją';

  constructor(private registrationService: RegistrationService) { }

  ngOnInit(): void {
    this.getDoctors()
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
  private getDoctors(): void {
    this.registrationService.getDoctors().subscribe(
      (response:Doctor[]) => {
        this.doctors = response;},
      (error :HttpErrorResponse) => {
        alert(error.message);
      });
  }


}
