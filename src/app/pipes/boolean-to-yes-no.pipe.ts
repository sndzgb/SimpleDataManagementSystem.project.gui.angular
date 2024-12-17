import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'booleanToYesNo'
})
export class BooleanToYesNoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value ? "Yes" : "No";
  }

}
