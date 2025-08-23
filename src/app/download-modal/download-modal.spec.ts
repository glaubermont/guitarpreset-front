import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadModal } from './download-modal';

describe('DownloadModal', () => {
  let component: DownloadModal;
  let fixture: ComponentFixture<DownloadModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DownloadModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DownloadModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
