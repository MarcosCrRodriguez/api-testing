import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MayorMenorComponent } from './components/mayor-menor/mayor-menor.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'mayor-menor', component: MayorMenorComponent },
];
