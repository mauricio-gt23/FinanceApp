import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
    providedIn: 'root'
  })
  export class HomeService {
  
    private baseUrl: string = "https://finanzas-upc.herokuapp.com";

    constructor( private http: HttpClient ) { }

    login(): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/user`);
    }

    registro( usuario: Usuario): Observable<any> {
      return this.http.post<any>(`${this.baseUrl}/user/create`, usuario);
    }
  
  }