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
  standalone: true, // ✅ transforma em standalone
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
    console.log('ID recebido:', id);

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

    this.isLoadingDownload = true;

    setTimeout(() => {
      this.isLoadingDownload = false;
      alert('Download iniciado!');
    }, 1500);
  }
}
