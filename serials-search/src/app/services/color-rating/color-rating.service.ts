import { ColorRaiting } from '../../model/Colors';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorRatingService {

  constructor() { }

  public setColor(rating: string): ColorRaiting {
    let tempValue = String(rating).substr(0, String(rating).lastIndexOf('.'));

    switch (tempValue) {
      case '0':
        return ColorRaiting.COLOR_0;
      case '1':
        return ColorRaiting.COLOR_1;
      case '2':
        return ColorRaiting.COLOR_2;
      case '3':
        return ColorRaiting.COLOR_3;
      case '4':
        return ColorRaiting.COLOR_4;
      case '5':
        return ColorRaiting.COLOR_5;
      case '6':
        return ColorRaiting.COLOR_6;
      case '7':
        return ColorRaiting.COLOR_7;
      case '8':
        return ColorRaiting.COLOR_8;
      case '9':
        return ColorRaiting.COLOR_9;
      case '10':
        return ColorRaiting.COLOR_10;
    }
  }
}
