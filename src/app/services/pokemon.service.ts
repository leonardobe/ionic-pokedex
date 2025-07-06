// src/app/api.service.ts
import { Injectable, inject } from '@angular/core'; // Importe 'inject'
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PokemonService {

  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon'; 

  getPokemons(offset: number = 0, limit: number = 20): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?offset=${offset}&limit=${limit}`).pipe(
      tap(() => console.log('Requisição GET bem-sucedida!')),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Um erro ocorreu:', error.error.message);
    } else {
      console.error(
        `Backend retornou o código ${error.status}, ` +
        `corpo era: ${error.error}`);
    }
    return throwError(() => new Error('Algo ruím aconteceu; por favor, tente novamente mais tarde.'));
  }
}