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
    console.log(' this.serialId', this.serialId);
    this.req
      .make('GET', `/singlesearch/shows?q=${this.serialId}`)
      .then((res) => {
        if (res) {
          this.serial = res;
          this.serial.title = res['name'];

          if (this.serial['rating'].average === null) {
            this.serial.rating = 'Lack of rating';
          }
          console.log(res);
        }
        this.serialImg = res['image'].medium;

        // if (res['rating'].average === null) {
        //   this.serial.rating = 'Lack of rating';
        // }
        console.log(res['image'].medium);
        // this.serial.rating = res['rating'].average;
        // this.serial.img = res['image'].medium;
        // this.serial.desc = res['summary'];
      });
    setTimeout(() => {
      this.loading = false;
      console.log(this.loading);
    }, 300);
  }
}
