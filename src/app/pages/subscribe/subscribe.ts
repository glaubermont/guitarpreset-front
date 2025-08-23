import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  standalone: true,
  template: '' // nada é renderizado
})
export class SubscribeComponent implements OnInit {
  ngOnInit(): void {
    window.location.href = 'https://www.youtube.com/channel/UChku1Tj9cFcOc2bejPmBLDw?sub_confirmation=1';
  }
}
