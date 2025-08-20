import { Component, OnInit } from '@angular/core';
import { BackingTracksService } from '../../services/backingtrack.service';
import { BackingTrack } from '../../models/BackingTrack';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-download-preset',
  templateUrl: './download-preset.html',
  styleUrls: ['./download-preset.scss']
})
export class DownloadPreset implements OnInit {
  backingTrack: BackingTrack | null = null;
  loading = true;
  error = '';

  constructor(
    private backingTracksService: BackingTracksService,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
  // Lê o ID da query string: ?id=298
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

}
