import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { employeeDetailInterface } from './employeeDatailInterface';

@Injectable({
  providedIn: 'root'
})
export class Employee {

  constructor(private http:HttpClient) { }

  getUrl = "http://localhost:3000/"

  getEmployeeData(){    
    return this.http.get<employeeDetailInterface[]>(`${this.getUrl}employeeDetails`)
  }

  addEmployeeData(data: any){
    return this.http.post(`${this.getUrl}employeeDetails`, data);
  }

  deleteEmployeeData(data: string){
    return this.http.delete(`${this.getUrl}employeeDetails/${data}`);
  }

  getEmployeeForEdit(data:string){
    return this.http.get(`${this.getUrl}employeeDetails/${data}`);

  }
  updateEmployeeData(id:string, data:any){
    return this.http.put(`${this.getUrl}employeeDetails/${id}`, data);
  }
}
