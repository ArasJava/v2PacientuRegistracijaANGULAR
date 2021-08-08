import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Patient} from "./patient";
import {Doctor} from "./doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private baseURL = "http://localhost:8080/doctor";

  constructor(private httpClient: HttpClient) { }

  public getDoctor(): Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`${this.baseURL}/all`);
  }

  public getDoctorById(doctorId: number): Observable<Doctor>{
    return this.httpClient.get<Doctor>(`${this.baseURL}/find/${doctorId}`);
  }

  public addDoctor(doctor: Doctor): Observable<Doctor>{
    return this.httpClient.post<Doctor>(`${this.baseURL}/add`, doctor);
  }

  public updateDoctor(doctor: Doctor): Observable<Doctor>{
    return this.httpClient.put<Doctor>(`${this.baseURL}/update`, doctor);
  }

  public deleteDoctor(doctorId: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.baseURL}/delete/${doctorId}`);
  }
}
