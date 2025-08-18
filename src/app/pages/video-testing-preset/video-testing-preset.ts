import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { SafePipe } from '../../pipes/safe.pipe';

@Component({
  selector: 'app-video-testing-preset',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, SafePipe],
  templateUrl: './video-testing-preset.html',
  styleUrls: ['./video-testing-preset.scss']
})
export class VideoTestingPreset {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { url: string; title: string }) {}
}
