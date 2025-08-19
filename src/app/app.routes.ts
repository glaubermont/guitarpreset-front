import { Routes } from '@angular/router';
import { ListPresetsAndBt } from './pages/list-presets-and-bt/list-presets-and-bt';
import { UploadPreset } from './pages/upload-preset/upload-preset';
import { DownloadPreset } from './pages/download-preset/download-preset';
import { Terms } from './pages/terms/terms';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
  { 
    path: 'list-presets-and-bt', 
    loadComponent: () => import('./pages/list-presets-and-bt/list-presets-and-bt')
      .then(m => m.ListPresetsAndBt)
  },
  { 
    path: 'upload', 
    loadComponent: () => import('./pages/upload-preset/upload-preset')
      .then(m => m.UploadPreset)
  },
  { 
    path: 'download-preset/:id',
    loadComponent: () => import('./pages/download-preset/download-preset')
      .then(m => m.DownloadPreset),
      data: { renderMode: 'ssr' }  // indica que essa rota será renderizada no servidor
  },
  { 
    path: 'terms', 
    loadComponent: () => import('./pages/terms/terms')
      .then(m => m.Terms)
  },
  { 
    path: 'contact', 
    loadComponent: () => import('./pages/contact/contact')
      .then(m => m.Contact)
  },
  { 
    path: '**', 
    redirectTo: 'list-presets-and-bt' 
  }
];
