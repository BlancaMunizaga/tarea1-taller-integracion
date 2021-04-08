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

  constructor(
    private apiService: ApiServiceService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const { serie, temporada } = this.activatedRoute.snapshot.params;
    this.serie = serie;
    this.getSerieTitle(serie);
    this.temporada = temporada;
    console.log(serie);
    console.log(temporada);
    this.getEpisodes();
  }

  getEpisodes(): void {
    this.apiService.findEpisodes({ series: this.serie, season: this.temporada }).then((result) => {
      this.episodes = result.filter((element: any) => element.season === this.temporada);
      console.log(this.episodes);
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = 'Unexpected error.';
    });
  }


  getSerieTitle(serie: any): void {
    if (serie === 'Better+Call+Saul') {
      this.serieTitle = 'Better Call Saul';
    } else if (serie === 'Breaking+Bad') {
      this.serieTitle = 'Breaking Bad';
    }
  }

}
