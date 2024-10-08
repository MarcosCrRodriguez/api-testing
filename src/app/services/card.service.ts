import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CartaService {
  private baseUrl = 'https://deckofcardsapi.com/api/deck';

  constructor(private http: HttpClient) {}

  // Crea un nuevo mazo de cartas y lo baraja
  crearMazo(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/new/shuffle/?deck_count=1`).pipe(
      catchError((error) => {
        console.error('Error creando el mazo', error);
        return of({ deck_id: null });
      })
    );
  }

  // Extrae una carta del mazo utilizando el ID del mazo
  sacarCarta(idMazo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idMazo}/draw/?count=1`).pipe(
      catchError((error) => {
        console.error('Error sacando la carta', error);
        return of({ cards: [], remaining: 0 });
      })
    );
  }

  // Sacar dos cartas del mazo
  sacarDosCartas(idMazo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${idMazo}/draw/?count=2`).pipe(
      catchError((error) => {
        console.error('Error sacando la carta', error);
        return of({ cards: [], remaining: 0 });
      })
    );
  }
}
