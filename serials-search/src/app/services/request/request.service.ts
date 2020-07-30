import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public baseUrl: string = environment.requestURL;
  public axios = axios.create();

  constructor() {}

  async make(method, path) {
    return new Promise((resolve, reject) => {
      this.axios({
        method: method,
        url: this.baseUrl + path,
        timeout: 6000,
        headers: {
          Accept: 'application/json',
        },
      })
        .then((res) => {
          resolve(res['data']);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}
