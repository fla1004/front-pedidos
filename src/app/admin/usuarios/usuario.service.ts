import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class UsuarioService{

    public ide_usuario: any;
    urlBase = environment.servidor;   
    headers: HttpHeaders | undefined;

    constructor(private http: HttpClient){
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

    getIdentidad(){
        let identidad =  JSON.parse(localStorage.getItem('usuario') ||"{}");
    
            if(identidad)
            {
                this.ide_usuario = identidad;
            }
            else
            {
                this.ide_usuario= null;
            }

        return this.ide_usuario;
    }
    mostrar()
    {
        return this.http.get(`${this.urlBase}/usuario/`,{headers: this.headers});
    }
    mostrar_id(id:any){
        return this.http.get(`${this.urlBase}/usuario/${id}`,{headers: this.headers});
    }
    guardar(usuario:any){
        return this.http.post(`${this.urlBase}/usuario`,usuario, {headers: this.headers});
    }
    
    modificar(id:any,usuario:any){
        return this.http.put(`${this.urlBase}/usuario/${id}`, usuario,{headers: this.headers});
    }
    cambiarContra(id:any,cuerpo:any)
    {
        return this.http.put(`${this.urlBase}/usuario/${id}`,cuerpo, {headers: this.headers});
    }
    eliminar(id:any){
        return this.http.delete(`${this.urlBase}/usuario/${id}`, {headers: this.headers});
    }
}