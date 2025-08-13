import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackingTracksService } from '../../services/backingtrack.service';
import { BackingTrack } from '../../models/BackingTrack';

@Component({
  selector: 'app-list-presets-and-bt',
  templateUrl: './list-presets-and-bt.html',
  standalone: true,
  imports: [CommonModule, HttpClientModule]
})
export class ListPresetsAndBt implements OnInit {
  presets: BackingTrack[] = [];
  loading = false;
  error = '';

  constructor(private backingTracksService: BackingTracksService) {}

  ngOnInit(): void {
    this.loading = true;
    this.backingTracksService.getBackingTracks().subscribe({
      next: (data) => {
        console.log('Dados recebidos da API:', data);
        this.presets = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados.';
        console.error('Erro da API:', err);
        this.loading = false;
      }
    });
  }
}
