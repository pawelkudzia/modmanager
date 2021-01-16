import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../contracts/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private _url: string = 'http://localhost:8080/api/v1/games';

  constructor(private _http: HttpClient) { }

  getGames(): Observable<Game[]> {
    return this._http.get<Game[]>(this._url);
  }

  getGame(id: string): Observable<Game> {
    return this._http.get<Game>(`${this._url}/${id}`);
  }

  addGame(game: Game): Observable<Game> {
    return this._http.post<Game>(this._url, game);
  }

  updateGame(game: Game): Observable<Game> {
    return this._http.patch<Game>(`${this._url}/${game._id}`, game);
  }

  deleteGame(id: string): Observable<Game> {
    return this._http.delete<Game>(`${this._url}/${id}`);
  }

}
