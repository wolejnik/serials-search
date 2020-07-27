import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  public api: any;
  public baseUrl: string = environment.requestURL;

  constructor(private httpClient: HttpClient) {}

  public getSerials(data: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/search/shows?q=${data}`);
  }
}
