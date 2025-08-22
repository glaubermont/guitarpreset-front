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
    return this.http.get<BackingTrack>(`${this.apiUrl}/${id}`,{
      headers: { 'Cache-Control': 'no-cache', 'Pragma': 'no-cache'}
      });
  }

  downloadPreset(filename: string): Observable<Blob> {
    // Aqui está a correção:
    return this.http.get(`${this.apiUrl}/download/${filename}`, { responseType: 'blob' as 'blob' });
  }
}
