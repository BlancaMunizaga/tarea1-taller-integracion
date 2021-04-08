import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private BASE_PATH: string;
  constructor(
    private http: HttpClient
  ) {
    this.BASE_PATH = 'https://tarea-1-breaking-bad.herokuapp.com/api/';
  }

  async findEpisodes(search: any): Promise<any> {
    const request: any = await this.http.get(`${this.BASE_PATH}episodes`, { params: search }).toPromise();
    return request;
  }

  async findEpisodeById(id: any): Promise<any> {
    const request: any = await this.http.get(`${this.BASE_PATH}episodes/${id}`).toPromise();
    return request;
  }

  async findCharcterByCompleteName(search: any): Promise<any> {
    const request: any = await this.http.get(`${this.BASE_PATH}characters`, { params: search }).toPromise();
    return request;
  }

  async findQuoteByCompleteName(search: any): Promise<any> {
    const request: any = await this.http.get(`${this.BASE_PATH}quote`, { params: search }).toPromise();
    return request;
  }
}
