import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "./patient";

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private baseURL = "http://localhost:8080/patient";

  constructor(private httpClient: HttpClient) { }

  public getPatients(): Observable<Patient[]>{
    return this.httpClient.get<Patient[]>(`${this.baseURL}/all`);
  }

  public addPatients(patient: Patient): Observable<Patient>{
    return this.httpClient.post<Patient>(`${this.baseURL}/add`, patient);
  }

  public updatePatients(patient: Patient): Observable<Patient>{
    return this.httpClient.put<Patient>(`${this.baseURL}/update`, patient);
  }

  public deletePatients(patientId: number ): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/delete/${patientId}`);
  }
}
