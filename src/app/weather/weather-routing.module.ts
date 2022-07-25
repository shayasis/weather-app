import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { HomeComponent } from './components/home/home.component';
import { WeatherComponent } from './weather.component';

export const routes: Routes = [
    {
        path: '', component: WeatherComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'favorites', component: FavoritesComponent },
            { path: '', redirectTo: 'home' ,pathMatch:'full' }
        ]
    },

];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AppWeatherRoutingModule { }