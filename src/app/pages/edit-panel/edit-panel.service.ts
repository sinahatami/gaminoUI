import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';


@Injectable()

export class EditPanelService {

  constructor(private http: HttpClient) { }

  getData(id) { return this.http.get(environment.API_URL + 'url', id) }

  putData(body) { return this.http.put(environment.API_URL + 'url', body) }

}
