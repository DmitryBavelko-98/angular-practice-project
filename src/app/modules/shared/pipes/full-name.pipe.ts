import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    const {firstName, lastName} = value;

    return `${firstName}, ${lastName}`;
  }

}
