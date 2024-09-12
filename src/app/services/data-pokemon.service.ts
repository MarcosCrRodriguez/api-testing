import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  baseUrl: string = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(private httpClient: HttpClient) {}

  get_pokemon(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/pikachu');
  }

  get_families(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/families');
  }

  get_locations(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/locations');
  }

  get_transactions(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.baseUrl + '/transactions');
  }
}
