import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from '../api/api-service.service';

@Component({
  selector: 'app-vista-personaje',
  templateUrl: './vista-personaje.component.html',
  styleUrls: ['./vista-personaje.component.css']
})
export class VistaPersonajeComponent implements OnInit {
  public character: any = [];
  public characterName: any = null;
  public quotes: any = [];
  public loading = true;
  public loadingQuotes = true;
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
    const { name } = this.activatedRoute.snapshot.params;
    this.characterName = name;
    this.getCharacter();
    this.getQuotes();
  }

  getCharacter(): void {
    this.apiService.findCharcterByCompleteName({ name: this.characterName }).then((result) => {
      this.character = result[0];
      if (!Array.isArray(result[0].category)) {
        this.character.category = result[0].category.split(',');
      }
      this.loading = false;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = 'Unexpected error.';
    });
  }

  getQuotes(): void {
    this.apiService.findQuoteByCompleteName({ author: this.characterName }).then((result) => {
      this.quotes = result;
      this.loadingQuotes = false;
    }).catch((err) => {
      console.log(err);
      this.errorMessage = 'Unexpected error.';
    });
  }

  getCategory(category: string, type: string): boolean {
    if (category.trim() === type) {
      return true;
    }
    return false;
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

  recargar(name: string): void {
    this.characterName = name;
    this.getCharacter();
    this.getQuotes();
  }


}
