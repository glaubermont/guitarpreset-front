import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { BackingTracksService } from '../services/backingtrack.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-download-modal',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule
  ],
  template: `
    <div class="download-wrapper" fxLayout="column" fxLayoutAlign="center center"
         style="min-height: 80vh; text-align: center;">
      
      <h2 class="download-title" style="margin-bottom: 20px;">
        {{ backingTrack?.downloaddescription }}
      </h2>

      <h5 *ngIf="!isSubscribed">Unlock progress {{ unlockProgress }}/1</h5>
      <h5 *ngIf="isSubscribed" style="color: green;">Unlock progress {{ unlockProgress }}/1</h5>

      <div class="button-group" style="margin-top: 30px; display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
        <a
          mat-raised-button
          color="warn"
          style="display: flex; align-items: center; gap: 8px;"
          href="https://www.youtube.com/channel/UChku1Tj9cFcOc2bejPmBLDw?sub_confirmation=1"
          target="_blank"
          (click)="enableDownload()">
          <mat-icon>play_arrow</mat-icon>
          Subscribe on YouTube
        </a>

        <button
          mat-flat-button
          color="primary"
          [disabled]="buttonDisabled"
          (click)="unlockDownload()"
          style="min-width: 200px; font-size: 16px; height: 50px;">
          <span *ngIf="!isLoadingDownload">Unlock Download</span>
          <span *ngIf="isLoadingDownload">Loading...</span>
          <mat-progress-spinner
            *ngIf="isLoadingDownload"
            diameter="24"
            mode="indeterminate"
            color="accent">
          </mat-progress-spinner>
        </button>
      </div>

      <!-- Botão Close embaixo -->
      <div style="margin-top: 20px;">
        <button mat-stroked-button color="warn" (click)="closeModal()" style="min-width: 120px; height: 40px;">
          Close
        </button>
      </div>

    </div>
  `
})
export class DownloadModalComponent {
  backingTrack: any;
  unlockProgress = 0;
  isSubscribed = false;
  isLoadingDownload = false;
  buttonDisabled = true;

  constructor(
    public dialogRef: MatDialogRef<DownloadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backingTracksService: BackingTracksService,
    private router: Router  
  ) {
    this.backingTrack = data;
  }

  enableDownload() {
    if (!this.isSubscribed) {
      this.unlockProgress++;
      this.isSubscribed = true;
      if (this.unlockProgress >= 1) {
        this.buttonDisabled = false;
      }
    }
  }

  unlockDownload() {
    if (!this.backingTrack?.filename || this.buttonDisabled) return;

    this.isLoadingDownload = true;

    this.backingTracksService.downloadPreset(this.backingTrack.filename).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = this.backingTrack.filename;
        a.click();
        window.URL.revokeObjectURL(url);
      },
      error: (err) => {
        console.error(err);
        alert('Erro ao baixar o arquivo.');
      },
      complete: () => {
        this.isLoadingDownload = false;
        this.dialogRef.close();
      }
    });
  }

 closeModal() {
    this.dialogRef.close();


  }
}
