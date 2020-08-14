import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AdminPanelService {

  constructor(private http: HttpClient) { }

  onPostShare(body) { return this.http.post(environment.API_URL + '', body) }
}
