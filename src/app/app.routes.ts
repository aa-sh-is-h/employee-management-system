import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Example } from './example/example';

export const routes: Routes = [
    {
        path: '',
        component: Home,
        title: 'Home | Employee Management System'
    },
    {
        path: 'example',
        component: Example,
        title: 'Example | Employee Management System'
    }
];
