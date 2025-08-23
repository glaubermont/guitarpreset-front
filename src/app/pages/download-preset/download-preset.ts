import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { BackingTracksService } from '../../services/backingtrack.service';
import { DownloadModalComponent } from '../../download-modal/download-modal';

@Component({
  selector: 'app-download-preset-page',
  template: '', // só abre o modal
})
export class DownloadPresetPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private backingTracksService: BackingTracksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Pega o ID do query param ?id=15
    const presetId = this.route.snapshot.queryParamMap.get('id');

    if (!presetId) {
      this.router.navigate(['/download-preset']);
      return;
    }

    this.backingTracksService.getBackingTracks().subscribe({
      next: (data) => {
        const preset = data.find(p => p.id === +presetId);
        if (preset) {
          this.dialog.open(DownloadModalComponent, {
            width: '400px',
            maxWidth: '90vw',
            height: 'auto',
            maxHeight: '80vh',
            data: preset
          }).afterClosed().subscribe(() => {
            this.router.navigate(['/presets']); // volta para a lista depois de fechar
          });
        } else {
          this.router.navigate(['/presets']);
        }
      },
      error: () => {
        this.router.navigate(['/presets']);
      }
    });
  }
}
