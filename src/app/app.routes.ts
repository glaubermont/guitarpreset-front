import { Routes } from '@angular/router';

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
    .then(m => m.DownloadPreset),  // ← vírgula aqui
  data: { prerender: false }      // desabilita prerender

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

export function getPrerenderParams() {
  return [
    { id: '298' },
    { id: '2' },
    { id: '3' }
    // adicione todos os IDs de presets que quer gerar estaticamente
  ];
}

