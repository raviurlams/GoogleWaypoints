import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectivePreloadingStrategy } from './selective-preloading-strategy';

const appRoutes: Routes = [
  {
    path: 'tours-dashboard',
    loadChildren: 'app/tours/tours.module#toursModule',
    data: { preload: true }
  },
  {
    path: '',
    redirectTo: '/tours-dashboard',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'tours-dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {
        // enableTracing: true, // <-- debugging purposes only
        preloadingStrategy: SelectivePreloadingStrategy,
      }
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    SelectivePreloadingStrategy
  ]
})
export class AppRoutingModule {}
