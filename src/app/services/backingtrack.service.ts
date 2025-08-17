import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackingTrack } from '../models/BackingTrack';

@Injectable({
  providedIn: 'root'
})
export class BackingTracksService {
  private apiUrl = 'https://wicked-terza-guitarpreset-4522c1b5.koyeb.app/api/backingtracks';

  constructor(private http: HttpClient) {}

  getBackingTracks(): Observable<BackingTrack[]> {
    return this.http.get<BackingTrack[]>(this.apiUrl);
  }
}
