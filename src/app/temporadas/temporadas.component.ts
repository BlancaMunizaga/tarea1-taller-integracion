import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api/api-service.service';

@Component({
  selector: 'app-temporadas',
  templateUrl: './temporadas.component.html',
  styleUrls: ['./temporadas.component.css']
})
export class TemporadasComponent implements OnInit {

  public bbEpisodes: any = [];
  public bcsEpisodes: any = [];
  public bbTemporadas: any = [];
  public bcsTemporadas: any = [];
  public loadingBcs = true;
  public loadingBb = true;
  public keys: string[] = [];
  public errorMessage: any = null;
  public search: any;
  public loadingCharacters = false;
  public characters: any = [];

  constructor(
    private apiService: ApiServiceService
  ) { }

  ngOnInit(): void {
    this.getDataBb();
    this.getDataBcs();
  }

  getDataBcs(): void {
    this.apiService.findEpisodes({ series: 'Better Call Saul' }).then((result) => {
      this.bcsEpisodes = result;
      this.bcsTemporadas = this.getListOfSeason(result);
      this.loadingBcs = false;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = 'Unexpected error.';
    });
  }

  getDataBb(): void {
    this.apiService.findEpisodes({ series: 'Breaking Bad' }).then((result) => {
      this.bbEpisodes = result;
      this.bbTemporadas = this.getListOfSeason(result);
      this.loadingBb = false;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = 'Unexpected error.';
    });
  }

  getListOfSeason(results: any): any[] {
    const seasons = results.reduce((prev: any, current: any) => (prev.season > current.season) ? prev : current).season;
    const list = [];
    for (let index = 0; index < seasons; index++) {
      list.push(index + 1);
    }
    return list;
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
