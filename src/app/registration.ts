import {Doctor} from "./doctor";

export interface Registration {

  id: number;
  doctor_id: number;
  date: string;
  time: string;
  purpose: string;
  message: string;
  doctors: Doctor[];
  doctorName: string;
  doctorSurname: string;
  doctorSpecialization: string;


}
