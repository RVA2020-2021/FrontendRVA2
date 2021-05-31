import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { STAVKE_PORUDZBINE_URL, STAVKE_ZA_PORUDZBINU_URL } from '../app.constants';
import { StavkaPorudzbine } from '../models/stavka-porudzbine';

@Injectable({
  providedIn: 'root'
})
export class StavkaPorudzbineService {

  constructor(private httpClient: HttpClient) { }

  public getStavkeZaPorudzbinu(idPorudzbine: number): Observable<any> {
    return this.httpClient.get(`${STAVKE_ZA_PORUDZBINU_URL}/${idPorudzbine}`);
  }
  public addStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): Observable<any> {
    stavkaPorudzbine.id = 0;
    return this.httpClient.post(`${STAVKE_PORUDZBINE_URL}`, stavkaPorudzbine);
  }
  public updateStavkaPorudzbine(stavkaPorudzbine: StavkaPorudzbine): Observable<any> {
    return this.httpClient.put(`${STAVKE_PORUDZBINE_URL}`, stavkaPorudzbine);
  }
  public deleteStavkaPorudzbine(id: number): Observable<any> {
    return this.httpClient.delete(`${STAVKE_PORUDZBINE_URL}/${id}`);
  }
}
