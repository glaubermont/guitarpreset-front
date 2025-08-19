import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BackingTracksService } from '../../services/backingtrack.service';
import { BackingTrack } from '../../models/BackingTrack';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { VideoTestingPreset } from '../video-testing-preset/video-testing-preset';

@Component({
  selector: 'app-list-presets-and-bt',
  templateUrl: './list-presets-and-bt.html',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ]
})
export class ListPresetsAndBt implements OnInit {
  presets: BackingTrack[] = [];
  loading = false;
  error = '';
  
  displayedColumns: string[] = ['artist', 'song', 'playmusic','linkcpagrip', 'software', 'videopreset'];
  dataSource = new MatTableDataSource<BackingTrack>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private backingTracksService: BackingTracksService,
      private dialog: MatDialog
  ) {}

  applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}

  ngOnInit(): void {
    this.loading = true;
    this.backingTracksService.getBackingTracks().subscribe({
      next: (data) => {
        this.presets = data;
        this.dataSource.data = data;
        this.loading = false;

        // Configura o paginator
        setTimeout(() => { 
          if(this.paginator) this.dataSource.paginator = this.paginator;
        });
      },
      error: (err) => {
        this.error = 'Erro ao carregar dados.';
        console.error('Erro da API:', err);
        this.loading = false;
      }
    });
  }

    // método para abrir o modal
  openVideo(url: string, title: string) {
    this.dialog.open(VideoTestingPreset, {
      data: { url, title },
      width: '800px',
      maxWidth: '95vw'
    });
}
}
