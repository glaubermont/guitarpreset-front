import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BackingTrack } from '../models/BackingTrack';

@Injectable({
  providedIn: 'root'
})
export class BackingTracksService {
  private apiUrl = 'http://localhost:8080/api/backingtracks';

  constructor(private http: HttpClient) {}

  getBackingTracks(): Observable<BackingTrack[]> {
    return this.http.get<BackingTrack[]>(this.apiUrl);
  }
}
