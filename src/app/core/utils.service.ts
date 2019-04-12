import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  stringEnumToKeyValue(stringEnum) {
    const keyValue = [];
    const keys = Object.keys(stringEnum).filter((value, index) => {
      return !(index % 2);
    });

    for (const k of keys) {
      keyValue.push({ key: k, value: stringEnum[k] });
    }

    return keyValue;
  }
}
