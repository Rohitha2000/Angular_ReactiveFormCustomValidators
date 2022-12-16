import { Injectable } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Register} from './registrationmodule'
@Injectable({
  providedIn: 'root'
})
export class RegistrationService{
    constructor(private http: HttpClient){}

    createuser(data:Register){
        return this.http.post<Register>("http://localhost:3000/posts", data)
        .pipe(map((data:Register)=>{
          return data;
        }))
        
      }

      getuser(){
        return this.http.get("http://localhost:3000/posts")
      }
}