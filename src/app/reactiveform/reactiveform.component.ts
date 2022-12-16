import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

import { RegistrationService } from './registration.service';
import { Register } from './registrationmodule';
import { ForbiddenNames } from './validator';


@Component({
  selector: 'app-reactiveform',
  templateUrl: './reactiveform.component.html',
  styleUrls: ['./reactiveform.component.css']
})


export class ReactiveformComponent implements OnInit {
    
    registerdata: Register[];
    selected1: string[] = ['painting']
  submitted=false;
  [x: string]: any;
   genders= ['female', 'male'];
   foods=['veg','non-veg'];
   hobb=['guitar','painting', 'cricket','other']
   hobbies=[
    {id: 1, name: 'guitar'},
    {id: 2, name: 'painting'},
    {id: 3, name: 'cricket'},
    {id: 4, name: 'other'}

   ];
  constructor(private registerservice: RegistrationService) { 
    
  }

  ngOnInit(): void {
    this.retrievedata();
  }

  registration= new FormGroup({
    firstname:new FormControl('',[ Validators.required, this.noSpaceAllowed, ForbiddenNames]),
    lastname: new FormControl('',Validators.required),
    gender: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.required, this.emailValidation]),
    food: new FormControl('', Validators.required),
    hobby: new FormControl([], [Validators.required, Validators.minLength(1)])


  })

  onCheckboxChange(event, hobby_name) {
    const hb: FormArray = this.registration.get('hobby') as FormArray;
   
    if (event.checked) {
      console.log(event.value);
      hb.push(new FormControl(hobby_name));
    } else {
       const index = hb.controls.findIndex(x => x.value === hobby_name);
       hb.removeAt(index);
    }


    
  }

  onSubmit(){
    this.submitted= true;
    console.log(this.registration);
    if(!this.registration.valid){
      return;
    }
    console.log(this.registration);
    
      this.registerservice.createuser((this.registration.value) as Register).subscribe((data: Register)=> {
        
        console.log(data)
        alert("Data added successfully")
  })

  this.retrievedata();
}



retrievedata(){
  this.registerservice.getuser().subscribe(res=>{
    this.registerdata = res as Register[] ;
    
    })
    console.log("sfsrfrfr", this.registerdata);
}
   
noSpaceAllowed(control: FormControl){
  if(control.value != null && control.value.indexOf(' ') != -1){
    return {noSpaceAllowed: true}
  }
  else{
    return null;
  }
}

alpahbetsOnly(event){
  const keycode= event.keyCode;
  if((keycode < 65 || keycode > 90) && (keycode < 97 || keycode > 123) && keycode > 31){
    return false;
  }
  return true;
}
// emailValidation(control: FormControl){
   
//  // const res= this.emailobj.emailvalidator(control);
//   const res1= this.emailobj.emailvalidator(this.registration.get['email']['controls']);
//   console.log(res1);
//  // console.log(res);
 
// return null;
// }

emailValidation(control:FormControl){
  if(control.value.search('@')== -1){
    return {emailValidation:true};
  }

  if(control.value.search('.com')== -1 )
  {
    
      return null;
      
  }
  else if(control.value.search('.com') >= 0){
    return null;
  }
  else{
      return null;
  }
}

}
