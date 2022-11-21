import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './restaurent.model';

@Component({
  selector: 'app-restaurent-dash',
  templateUrl: './restaurent-dash.component.html',
  styleUrls: ['./restaurent-dash.component.css']
})
export class RestaurentDashComponent implements OnInit {

  formValue!: FormGroup
  restaurentModelObj:RestaurentData = new RestaurentData;
  allRestaurentData: any;
  showAdd!:boolean;
  showbtn!:boolean;

  constructor(private formBuilder: FormBuilder, private api:ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name: [''],
      email: [''],
      mobile: [''],
      address: [''],
      services: ['']
    })
    this.getAllData()
  }
  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showbtn=false;
  }
 addresto(){
 this.restaurentModelObj.name = this.formValue.value.name;
 this.restaurentModelObj.email = this.formValue.value.email;
 this.restaurentModelObj.mobile = this.formValue.value.mobile;
 this.restaurentModelObj.address = this.formValue.value.address;
 this.restaurentModelObj.services = this.formValue.value.services;

 this.api.postRestaurent(this.restaurentModelObj).subscribe(res=>{
   console.log(res);
   alert("Restaurent Record Added Sucessfull");
   let ref =document.getElementById('clear');
   ref?.click();
   this.formValue.reset()
   this.getAllData();
 },
 err=>{
   alert("Restaurent Record Not  Added Sucesfully !!! ")
 }
 )
}
getAllData(){
  this.api.getRestaurent().subscribe(res=>{
    this.allRestaurentData = res;
    console.log(this.allRestaurentData)
  })
}
deleteResto(data:any){
  this.api.deleteRestaurent(data.id).subscribe(res=>{
    alert("deleted succesfully")
    this.getAllData();//quick refresh data
  })
}
onEditResto(data:any){
  this.showAdd=false;
  this.showbtn=true;
  this.restaurentModelObj.id = data.id
  this.formValue.controls['name'].setValue(data.name);
  this.formValue.controls['email'].setValue(data.email);
  this.formValue.controls['mobile'].setValue(data.mobile);
  this.formValue.controls['address'].setValue(data.address);
  this.formValue.controls['services'].setValue(data.services);
  
}

updateresto(){
  this.restaurentModelObj.name = this.formValue.value.name;
  this.restaurentModelObj.email = this.formValue.value.email;
  this.restaurentModelObj.mobile = this.formValue.value.mobile;
  this.restaurentModelObj.address = this.formValue.value.address;
  this.restaurentModelObj.services = this.formValue.value.services;

  this.api.updateRestaurent(this.restaurentModelObj,this.restaurentModelObj.id).subscribe(res=>{
    alert("Restaurent data updated")
    let ref =document.getElementById('clear');
    ref?.click();
    this.formValue.reset()
    this.getAllData();

  })
}
}
