import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sprintfilter',
  pure: false
})
export class SprintfilterPipe implements PipeTransform {

  transform(values: any[], idsprint: string): any {
    if (idsprint === "") {
      return values
    }
    return values.filter((item) => String(item.targetsprint.id === idsprint))
  }

}
