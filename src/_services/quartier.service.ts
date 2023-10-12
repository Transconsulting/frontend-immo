import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class QuartierService {
  public API_URL = environment.url_backend;

  constructor(private http: HttpClient) {}
  
  public getQuartier(): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL+'quartier');
  }

  public getQuartierByCommune(id): Observable<any[]>{
    return this.http.get<any[]>(this.API_URL+'quartier/listeByCommune/'+ id);
  }

}
