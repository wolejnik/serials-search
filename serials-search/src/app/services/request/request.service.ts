import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public baseUrl: string = environment.requestURL;
  public axios = axios.create();

  constructor(private http: HttpClient) {}

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

  public request(path: string): Observable<any> {
    return this.http
      .get(this.baseUrl + path)
      .pipe(tap(), catchError(this.handleError));
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
