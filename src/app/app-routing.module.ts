import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EpisodiosComponent } from './episodios/episodios.component';
import { TemporadasComponent } from './temporadas/temporadas.component';
import { VistaEpisodioComponent } from './vista-episodio/vista-episodio.component';
import { VistaPersonajeComponent } from './vista-personaje/vista-personaje.component';

const routes: Routes = [
  {
    path: '',
    component: TemporadasComponent,
    data: { title: 'Temporadas Series' },
  },
  {
    path: 'temporada/:serie/:temporada',
    component: EpisodiosComponent,
    data: { title: 'Episodios temporada' },
  },
  {
    path: 'episodio/:id',
    component: VistaEpisodioComponent,
    data: { title: 'Vista Episodio' },
  },
  {
    path: 'character/:name',
    component: VistaPersonajeComponent,
    data: { title: 'Vista Personaje' },
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
