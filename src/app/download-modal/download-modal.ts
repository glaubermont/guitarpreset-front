import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-download-modal',
  standalone: true,
  imports: [
    MatDialogModule, // necessário para mat-dialog-content / mat-dialog-actions
    MatButtonModule  // necessário para mat-raised-button
  ],
  template: `
    <h2 mat-dialog-title>Download Preset</h2>
    <mat-dialog-content>
      <p><strong>Song:</strong> {{ data.song }}</p>
      <p><strong>Description:</strong> {{ data.downloaddescription }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <a *ngIf="data.linkcpagrip" [href]="data.linkcpagrip" target="_blank" rel="noopener noreferrer">
        <button mat-raised-button color="primary">Download</button>
      </a>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `
})
export class DownloadModalComponent {
  constructor(
    public dialogRef: MatDialogRef<DownloadModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
}
