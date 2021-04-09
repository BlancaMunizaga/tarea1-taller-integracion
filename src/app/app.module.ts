import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemporadasComponent } from './temporadas/temporadas.component';
import { HttpClientModule } from '@angular/common/http';
import { EpisodiosComponent } from './episodios/episodios.component';
import { VistaEpisodioComponent } from './vista-episodio/vista-episodio.component';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { VistaPersonajeComponent } from './vista-personaje/vista-personaje.component';
import { FormsModule } from '@angular/forms';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [
    AppComponent,
    TemporadasComponent,
    EpisodiosComponent,
    VistaEpisodioComponent,
    VistaPersonajeComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
