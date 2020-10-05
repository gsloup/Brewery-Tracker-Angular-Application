import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  // Takes 10-digit US phone number and formats to '(123)456-7890' format
  transform(phoneNumber: string): string {
    let p = phoneNumber;
    return (`(${p.substring(0,3)}) ${p.substring(3,6)}-${p.substring(6)}`);
  }

}
