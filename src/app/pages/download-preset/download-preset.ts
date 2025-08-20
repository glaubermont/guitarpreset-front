import { Component, OnInit } from '@angular/core';
import { BackingTracksService } from '../../services/backingtrack.service';
import { BackingTrack } from '../../models/BackingTrack';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-download-preset',
  templateUrl: './download-preset.html',
  styleUrls: ['./download-preset.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ]
})
export class DownloadPreset implements OnInit {
  backingTrack: BackingTrack | null = null;
  loading = true;
  error = '';

  isSubscribed = false;
  unlockProgress = 0;
  isLoadingDownload = false;

  constructor(
    private backingTracksService: BackingTracksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id'));
    if (id) {
      this.backingTracksService.getBackingTrackById(id).subscribe({
        next: (data) => {
          this.backingTrack = data;
          this.loading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'Preset não encontrado';
          this.loading = false;
        }
      });
    } else {
      this.error = 'ID inválido';
      this.loading = false;
    }
  }

  enableDownload() {
    this.isSubscribed = true;
    this.unlockProgress = 1;
  }

  unlockDownload() {
    if (!this.isSubscribed) {
      alert('Você precisa completar a ação antes de desbloquear o download.');
      return;
    }

    const filename = this.backingTrack?.filename;
    if (!filename) {
      alert('Nenhum arquivo definido para este preset.');
      return;
    }

    this.isLoadingDownload = true;

    this.backingTracksService.downloadPreset(filename).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao baixar o arquivo.');
      },
      complete: () => {
        this.isLoadingDownload = false;
      }
    });
  }
}
