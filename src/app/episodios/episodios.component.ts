import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api/api-service.service';

@Component({
  selector: 'app-episodios',
  templateUrl: './episodios.component.html',
  styleUrls: ['./episodios.component.css']
})
export class EpisodiosComponent implements OnInit {
  public episodes: any = [];
  public serie = null;
  public serieTitle: any = null;
  public temporada = null;
  public loading = true;
  public errorMessage: any = null;
  public search: any;
  public loadingCharacters = false;
  public characters: any = [];

  constructor(
    private apiService: ApiServiceService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    const { serie, temporada } = this.activatedRoute.snapshot.params;
    this.serie = serie;
    this.getSerieTitle(serie);
    this.temporada = temporada;
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.apiService.findEpisodes({ series: this.serie }).then((result) => {
      this.episodes = result.filter((element: any) => element.season === this.temporada);
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = 'Unexpected error.';
    });
  }

  async buscar(): Promise<void> {
    this.loadingCharacters = true;
    let True = true;
    let charactersList: any = [];
    let offSet = 0;
    while (True) {
      const result = await this.apiService.findCharcterByCompleteName({ name: this.search, limit: 10, offset: offSet });
      if (charactersList.length === 0) {
        charactersList = result;
      } else {
        charactersList.concat(result);
      }
      if (result.length < 10) {
        True = false;
      }
      offSet += 10;
    }
    this.characters = charactersList;
    this.loadingCharacters = false;
  }



  getSerieTitle(serie: any): void {
    if (serie === 'Better+Call+Saul') {
      this.serieTitle = 'Better Call Saul';
    } else if (serie === 'Breaking+Bad') {
      this.serieTitle = 'Breaking Bad';
    }
  }

  back(): void {
    this.location.back();
  }

}
