import { Component, OnInit } from '@angular/core';
import{FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserModel } from './userdashboardmodel';
import { ApiService } from '../services/api.service';
import { response } from 'express';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  userformVal !: FormGroup;
  submitted = false;
  userData !:any;
  userModelObj : UserModel = new UserModel();
  showAdd !: boolean;
  showUpdate !: boolean;


  constructor(private formbuilder: FormBuilder, 
    private api: ApiService) { 

  }

  ngOnInit(): void {
    this.userformVal = this.formbuilder.group({
      firstName : ['',Validators.required],
      lastName : ['',Validators.required],
      gmail : ['',[Validators.required, Validators.email]],
      gender : ['',Validators.required]
    })
    this.getUsers()
  }

  addUser(){
    this.userformVal.reset()
    this.showAdd = true;
    this.showUpdate = false;
  }
  // get userformValControl() {
  //   return this.userformVal.controls;
  // }

  onSubmit() {
    this.submitted = true;
    if (this.userformVal.valid) {
      alert('Form Submitted succesfully!!!');
      
    }
  }
  
postUserdetails(){
  
  this.userModelObj.firstName = this.userformVal.value.firstName;
  this.userModelObj.lastName = this.userformVal.value.lastName;
  this.userModelObj.gmail = this.userformVal.value.gmail;
  this.userModelObj.gender = this.userformVal.value.gender;

  this.api.postUser(this.userModelObj)
  .subscribe(response=>{
    console.log(response);
    alert("User added successfully")
    // let ref = document.getElementById("close")
    // ref?.click();
    this.userformVal.reset();
    this.getUsers();

  },
)
}
getUsers(){
  this.api.getAllUsers()
  .subscribe(response=>{
    this.userData = response;

  })
}
deleteUser(row: any){
  this.api.deleteUser(row.id)
  .subscribe(response=>{
    alert("User Deleted Successfully")
    this.getUsers()

  })

}

editUser(row: any){
  this.showAdd = false;
    this.showUpdate = true;
  this.userModelObj.id = row.id;
  this.userformVal.controls['firstName'].setValue(row.firstName);
  this.userformVal.controls['lastName'].setValue(row.lastName);
  this.userformVal.controls['gmail'].setValue(row.gmail);
  this.userformVal.controls['gender'].setValue(row.gender);
}
updateUsers(){
  this.userModelObj.firstName = this.userformVal.value.firstName;
  this.userModelObj.lastName = this.userformVal.value.lastName;
  this.userModelObj.gmail = this.userformVal.value.gmail;
  this.userModelObj.gender = this.userformVal.value.gender;

  this.api.updateUser(this.userModelObj,this.userModelObj.id)
  .subscribe(response=>{
    alert('User Updated Successfully')
    this.userformVal.reset();
    this.getUsers();
  })

}

}
