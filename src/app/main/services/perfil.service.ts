import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "src/app/home/interfaces/usuario.interface";

@Injectable({
    providedIn: 'root'
  })
export class PerfilService {
    
    private baseUrl: string = "https://finanzas-upc.herokuapp.com";
    
    constructor( private http: HttpClient ) { }

    obtenerPerfil( id: string): Observable<any> {
        return this.http.get<any>(`${this.baseUrl}/user/${id}`);
    }

    editarPerfil( usuario: Usuario): Observable<any> {
        return this.http.put<any>(`${this.baseUrl}/user/update/${usuario.id}`, usuario);
    }
}