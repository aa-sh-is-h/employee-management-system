import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../services/employee';
import { MatButtonModule } from '@angular/material/button';
import { employeeDetailInterface } from '../services/employeeDatailInterface';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';


@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, MatButtonModule, MatIconModule, MatFormFieldModule, FormsModule, MatTableModule, MatPaginatorModule, MatButtonToggleModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})

export class Home implements OnInit, AfterViewInit {

  constructor(private employeeService: Employee) {
    // this.datasource = new MatTableDataSource<employeeDetailInterface>(this.filteredEmployeeList);
    // this.datasource.paginator = this.paginator;
  }

  employeeList: employeeDetailInterface[] = [];
  filteredEmployeeList: employeeDetailInterface[] = [];
  searchedString: String = '';
  modalTitle: string = 'Add Employee';
  modalButton: string = 'Add';
  employeeId: string = '';
  isView: boolean = false;
  datasource!: MatTableDataSource<employeeDetailInterface>

  displayedColumns: string[] = ['Name', 'Date Of Birth', 'Gender', 'Education', 'Department', 'Salary', 'Experience', 'Action'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    if (this.datasource) {
      this.datasource.paginator = this.paginator;
    }
  }

  addEmployee = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    dateOfBirth: new FormControl(''),
    gender: new FormControl(''),
    education: new FormControl(''),
    department: new FormControl(''),
    experience: new FormControl(),
    salary: new FormControl()
  });



  ngOnInit(): void {
    this.getEmployeeList();
  }

  getEmployeeList() {
    this.employeeService.getEmployeeData().subscribe(data => {
      this.employeeList = data;
      this.filteredEmployeeList = data;
      this.datasource = new MatTableDataSource<employeeDetailInterface>(data);
      this.datasource.paginator = this.paginator;
    })
  }

  addData() {
    // this.modalTitle = 'Add Employee';
    this.employeeService.addEmployeeData(this.addEmployee.value).subscribe((result) => {
      console.log(result);
      this.addEmployee.reset();
      this.ngOnInit();
    });
  }

  deleteData(id: string) {
    this.employeeId = id;
  }

  updateData(id: string) {
    this.modalTitle = 'Edit Employee';
    this.modalButton = 'Update';
    this.employeeService.getEmployeeForEdit(id).subscribe((result: any) => {
      this.employeeId = result.id;
      this.addEmployee.setValue({
        firstName: result.firstName,
        lastName: result.lastName,
        dateOfBirth: result.dateOfBirth,
        gender: result.gender,
        education: result.education,
        department: result.department,
        experience: result.experience,
        salary: result.salary
      })
    })
  }

  updateEmployee() {
    this.employeeService.updateEmployeeData(this.employeeId, this.addEmployee.value).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
      this.addEmployee.reset();
    })
  }

  changeModalTitle() {
    this.modalTitle = 'Add Employee';
    this.modalButton = 'Add';

  }

  formCondition() {
    if (this.modalButton == 'Add') {
      this.addData();
    }
    else {
      this.updateEmployee()
    }
  }

  deleteFunction() {
    this.employeeService.deleteEmployeeData(this.employeeId).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    })
  }

  filterByDepartment(event: Event): void {
    const selectedDepartment = (event.target as HTMLSelectElement).value;
    if (selectedDepartment === '') {
      this.filteredEmployeeList = this.employeeList; //show all
    }
    else {
      this.filteredEmployeeList = this.employeeList.filter(emp =>
        emp.department.toLocaleLowerCase() == selectedDepartment.toLocaleLowerCase()
      );
    }

    this.datasource = new MatTableDataSource<employeeDetailInterface>(this.filteredEmployeeList);
    this.datasource.paginator = this.paginator;
  }

  filterBySearch($event: Event): void {
    // event?.preventDefault();
    console.log(this.searchedString);
    if (this.searchedString === '') {
      this.filteredEmployeeList = this.employeeList; //show all
    }
    else {
      this.filteredEmployeeList = this.employeeList.filter(emp =>
        emp.department.toLocaleLowerCase() == this.searchedString.toLocaleLowerCase() ||
        emp.firstName.toLocaleLowerCase() == this.searchedString.toLocaleLowerCase() ||
        // emp.lastName.toLocaleLowerCase() == this.searchedString.toLocaleLowerCase() ||
        emp.gender.toLocaleLowerCase() == this.searchedString.toLocaleLowerCase()
      );
    }
    this.datasource = new MatTableDataSource<employeeDetailInterface>(this.filteredEmployeeList);
    this.datasource.paginator = this.paginator;
  }

  table() {
    this.isView = false;
  }

  card() {
    this.isView = true;
  }

}
// export interface employeeDetailInterface {
//     id: string,
//     firstName: string,
//     lastName: string,
//     gender: string,
//     dateOfBirth: string,
//     education: string,
//     department: string,
//     salary: number,
//     experience: number
// }
