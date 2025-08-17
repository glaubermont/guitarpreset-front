import { Routes } from '@angular/router';
import { ListPresetsAndBt } from './pages/list-presets-and-bt/list-presets-and-bt';

export const routes: Routes = [
  { path: '', redirectTo: 'list-presets-and-bt', pathMatch: 'full' },
  { path: 'list-presets-and-bt', component: ListPresetsAndBt },
  { path: '**', redirectTo: 'list-presets-and-bt' }
];
