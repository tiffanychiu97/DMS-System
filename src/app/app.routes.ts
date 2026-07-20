import { Routes } from '@angular/router';
import { DefectList } from './features/defect-list/defect-list';
import { Dashboard } from './features/dashboard/dashboard';
import { DefectForm } from './features/defect-form/defect-form';

export const routes: Routes = [
  { path: '', redirectTo: 'defects', pathMatch: 'full' },
  { path: 'defects', component: DefectList },
  { path: 'dashboard', component: Dashboard },
  { path: 'defect-form', component: DefectForm }
];
