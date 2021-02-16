import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

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

  mostrar_prod()
  {
    return this.http.get(`${this.urlBase}/categoria/`,{headers: this.headers});
  }
  
  guardar(categoria:any){
    return this.http.post(`${this.urlBase}/categoria`,categoria, {headers: this.headers});
  }

  modificar(id:any,categoria:any){
    return this.http.put(`${this.urlBase}/categoria/${id}`,categoria,{headers: this.headers});
  }

  eliminar(id:any){
    return this.http.delete(`${this.urlBase}/categoria/${id}`,{headers: this.headers});
  }


 
}
