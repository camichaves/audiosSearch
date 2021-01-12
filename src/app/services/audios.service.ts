import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AudiosService {

  constructor(private http: HttpClient) { }

  public getAudios() {
      return this.http.get<any[]>('assets/audios.json');
  }
}
