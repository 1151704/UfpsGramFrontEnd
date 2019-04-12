import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { API_REST } from '../url.constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {



  constructor(private http: HttpClient) {



  }

  getTokenValid(): boolean {
    let tokenValid = this.http.get(API_REST+"token");

    if (tokenValid) {
      tokenValid.subscribe(data => {
        return data;
      })
    }
    return false;
  }

}
