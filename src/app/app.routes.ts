import { Routes } from '@angular/router';
import { DefectList } from './features/defect-list/defect-list';
import { Dashboard } from './features/dashboard/dashboard';

export const routes: Routes = [
  { path: '', redirectTo: 'defects', pathMatch: 'full' },
  { path: 'defects', component: DefectList },
  { path: 'dashboard', component: Dashboard },
];
