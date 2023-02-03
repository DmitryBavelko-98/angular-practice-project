import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressPipe'
})
export class AddressPipe implements PipeTransform {

  transform(address: any, ...args: number[]): unknown {
    const index = args[0];

    return `${index + 1}. ${address.city}: ${address.addressLine}, ${address.zip} `;
  }

}
