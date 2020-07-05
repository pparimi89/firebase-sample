import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {
   employeeForm = this.fb.group({
        id: ['', Validators.required],
        name: ['', Validators.required],
        sal: ['', Validators.required]
   });

    columnDefs = [
           {headerName:'Id', field: 'id' },
           {headerName:'Name', field: 'name' },
           {headerName:'Salary', field: 'sal'}
       ];

  public jsonData: any;
  public addSuccessMessage: String;

  constructor(private http: HttpClient, private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.getEmployees();
  }

  onSubmit() {
    var formControls = this.employeeForm.controls;
    this.http.get("https://herok-sample.herokuapp.com/employee/add/"+formControls.id.value+"/"+formControls.name.value+"/"+formControls.sal.value)
      .subscribe(data => {
        this.addSuccessMessage = JSON.stringify({data}) +" Added successfully";
        this.getEmployees();
      });
  }
  getEmployees() {
    this.http.get("https://herok-sample.herokuapp.com/employees")
      .subscribe(data => {
        this.jsonData = data;
      });
  }

}
