import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 17) {
      return value.substr(0, 17) + '...';
    }
    return value;
  }

}
