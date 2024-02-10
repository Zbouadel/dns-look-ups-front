import { Routes } from '@angular/router';
import { DomainLookUpsComponent } from './modules/domain-look-ups/domain-look-ups.component';

export const routes: Routes = [

    { path: 'upload', component: DomainLookUpsComponent },
    { path: '**', redirectTo:'/upload' },
];
