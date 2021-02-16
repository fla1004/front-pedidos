import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  urlBase = environment.servidor;

  constructor(private http: HttpClient) { }

  login(usuario: Usuario){
    return this.http.post(`${this.urlBase}/login`, usuario);
  }
}