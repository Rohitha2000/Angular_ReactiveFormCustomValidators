
import { AbstractControl } from "@angular/forms";


export function ForbiddenNames(control: AbstractControl){
  let forbidden= ['sam', 'hello', 'hi','abcd'];
 

for (var forb of forbidden) {
    if(forb === control.value){
        return {Forbidden: true};
    }
}
return null;
}