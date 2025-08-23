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
  buttondDisabled = true;

  constructor(
    private backingTracksService: BackingTracksService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
  // Captura ID da rota (não da query string)

  const id = Number(this.route.snapshot.queryParamMap.get('id'));
  console.log("id = ",id);
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
       // Verifica se a página já foi recarregada
    if (!sessionStorage.getItem('alreadyReloaded')) {
      sessionStorage.setItem('alreadyReloaded', 'true'); // marca que recarregou
      window.location.reload(); // recarrega a página
    }
}


enableDownload() {
  if (this.isSubscribed || this.isLoadingDownload) return;

  // Inicia o loading do botão de download
  this.isLoadingDownload = false;
  this.buttondDisabled = false;
  

  // Após 5 segundos, desbloqueia o botão e remove o loading

}


  unlockDownload() {
 
    const filename = this.backingTrack?.filename;
    if (!filename) {
      alert('Nenhum arquivo definido para este preset.');
      return;
    }

    if (this.buttondDisabled ==false) {

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
}
