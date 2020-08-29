import { ColorRaiting } from './../../model/Colors';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request/request.service';
import { ColorRatingService } from 'src/app/services/color-rating/color-rating.service';

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

  constructor(private req: RequestService, private route: ActivatedRoute, private color: ColorRatingService) {}

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

  public setColorRating(value: string): ColorRaiting {
    return this.color.setColor(value);
  }
}
