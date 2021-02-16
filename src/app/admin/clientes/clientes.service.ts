import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  urlBase = environment.servidor;
  headers: HttpHeaders | undefined;

  constructor(private http: HttpClient) 
  {
    try{
      let token = JSON.parse(atob(localStorage.getItem("token")||'{}'));

      this.headers = new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8',
        'Authorization': 'Bearer '+ token.access_token,
      });
    }
    catch(error){
      console.log(error);
    }
  }
  mostrar(){
    return this.http.get(`${this.urlBase}/cliente/`, {headers: this.headers});
  }
  guardar(cliente:any){
    return this.http.post(`${this.urlBase}/cliente`, cliente , {headers:this.headers});
  }
  modificar(id:any,cliente:any){
    return this.http.put(`${this.urlBase}/cliente/${id}`,cliente,{headers: this.headers});
  } 
  eliminar(id:any){
    return this.http.delete(`${this.urlBase}/cliente/${id}`, {headers: this.headers});
}
}
