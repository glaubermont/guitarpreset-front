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

  // Rota existente: todos os backing tracks
  getBackingTracks(): Observable<BackingTrack[]> {
    return this.http.get<BackingTrack[]>(this.apiUrl);
  }

  // Nova rota: buscar por ID
getBackingTrackById(id: number): Observable<BackingTrack> {
  const cacheBuster = new Date().getTime();
  return this.http.get<BackingTrack>(`${this.apiUrl}/${id}?cb=${cacheBuster}`, {
    headers: { 
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    }
  });
}

  downloadPreset(filename: string): Observable<Blob> {
    // Aqui está a correção:
    return this.http.get(`${this.apiUrl}/download/${filename}`, { responseType: 'blob' as 'blob' });
  }
}
