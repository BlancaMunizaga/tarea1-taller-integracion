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

}
