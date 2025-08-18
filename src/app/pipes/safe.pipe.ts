import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({name: 'safe', standalone: true})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): SafeResourceUrl {
    // Converte URL do YouTube para embed
    if (url.includes('youtube.com/watch')) {
      url = url.replace('watch?v=', 'embed/');
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}