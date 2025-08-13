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
    MatButtonModule
  ]
})
export class ListPresetsAndBt implements OnInit {
  presets: BackingTrack[] = [];
  loading = false;
  error = '';
  
  displayedColumns: string[] = ['artist', 'song', 'playmusic', 'presetguitar', 'software', 'videopreset'];
  dataSource = new MatTableDataSource<BackingTrack>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private backingTracksService: BackingTracksService) {}

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
}
