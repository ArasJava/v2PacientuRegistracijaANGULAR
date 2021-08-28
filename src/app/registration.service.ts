import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Registration} from "./registration";
import {Doctor} from "./doctor";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private baseURL = "http://localhost:8080/registration";

  constructor(private httpClient: HttpClient) { }

  public getRegistrations(): Observable<Registration[]> {
    return this.httpClient.get<Registration[]>(`${this.baseURL}/all`);
  }

  public addRegistration(registration :Registration): Observable<Registration> {
    return this.httpClient.post<Registration>(`${this.baseURL}/add`,registration);
  }

  public updateRegistration(registration :Registration): Observable<Registration> {
    return this.httpClient.put<Registration>(`${this.baseURL}/update`,registration);
  }

  public deleteRegistration(registrationId :number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/delete/${registrationId}`);
  }

  public getDoctors(): Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`${this.baseURL}/all`);
  }
}
