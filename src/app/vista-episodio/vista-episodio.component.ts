import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api/api-service.service';

@Component({
  selector: 'app-vista-episodio',
  templateUrl: './vista-episodio.component.html',
  styleUrls: ['./vista-episodio.component.css']
})
export class VistaEpisodioComponent implements OnInit {
  public episode: any = [];
  public episodeId: any = null;
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
    const { id } = this.activatedRoute.snapshot.params;
    this.episodeId = id;
    this.getEpisode();
  }

  getEpisode(): void {
    this.apiService.findEpisodeById(this.episodeId).then((result) => {
      this.episode = result[0];
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = 'Unexpected error.';
    });
  }

  back(): void {
    this.location.back();
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

}
