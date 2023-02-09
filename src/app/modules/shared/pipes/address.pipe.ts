import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressPipe'
})
export class AddressPipe implements PipeTransform {

  transform(address: any, ...args: number[]): unknown {
    return `${address.city}: ${address.addressLine}, ${address.zip} `;
  }

}
