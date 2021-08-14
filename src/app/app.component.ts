import {Component} from '@angular/core';
import {Patient} from "./patient";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  registrationTitle = 'Registracija į dermatologinę kliniką';
  selectDoctor = 'Pasirinkite gydytoją';
  registrationDone = ''




}
