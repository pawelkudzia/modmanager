import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Mod } from '../contracts/mod';

@Injectable({
  providedIn: 'root'
})
export class ModService {
  private _url: string = 'http://localhost:8080/api/v1/mods';

  constructor(private _http: HttpClient) { }

  getMods(): Observable<Mod[]> {
    return this._http.get<Mod[]>(this._url);
  }

  getMod(id: string): Observable<Mod> {
    return this._http.get<Mod>(`${this._url}/${id}`);
  }

  addMod(mod: Mod): Observable<Mod> {
    return this._http.post<Mod>(this._url, mod);
  }

  updateMod(mod: Mod): Observable<Mod> {
    return this._http.patch<Mod>(`${this._url}/${mod._id}`, mod);
  }

  deleteMod(id: string): Observable<Mod> {
    return this._http.delete<Mod>(`${this._url}/${id}`);
  }
}
