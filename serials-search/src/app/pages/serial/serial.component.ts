import { ColorRaiting } from './../../model/Colors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request/request.service';

@Component({
  selector: 'app-serial',
  templateUrl: './serial.component.html',
  styleUrls: ['./serial.component.scss'],
})
export class SerialComponent implements OnInit {
  public serialId: string = '';
  public serial: any;
  public loading: boolean = true;
  public serialImg: string = '';

  constructor(private req: RequestService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.serialId = this.route.snapshot.paramMap.get('id');
    this.req.make('GET', `/shows/${this.serialId}`).then((res) => {
      if (res) {
        this.serial = res;
        this.serial.title = res['name'];

        if (this.serial['rating'].average === null) {
          this.serial.rating.average = 'Lack of rating';
        } else {
          console.log(this.serial['rating'].average);
        }
        this.serialImg = res['image'].medium;
      }
    });
    setTimeout(() => {
      this.loading = false;
    }, 300);
  }

  public setColorRating(value: string): string {
    let tempValue = String(value).substr(0, String(value).lastIndexOf('.'));

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
