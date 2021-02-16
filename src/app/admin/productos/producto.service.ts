import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  urlBase = environment.servidor;
  headers: HttpHeaders | undefined;

  constructor(private http: HttpClient) { 
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

  mostrar(filtro):Observable<any>{
    return this.http.get(`${this.urlBase}/producto/${filtro}`, {headers: this.headers});
  }
  mostrar_categoria()
  {
    return this.http.get(`${this.urlBase}/categoria/`,{headers: this.headers});
  }
  
  eliminar(id:any){
    return this.http.delete(`${this.urlBase}/producto/${id}`,{headers: this.headers});
  }
  guardar(data:any)
  {
    const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('precio_compra', data.precio_compra);
    fd.append('precio_venta', data.precio_venta);
    fd.append('stock', data.stock);
    fd.append('descripcion', data.descripcion);
    fd.append('imagen', data.imagen);
    fd.append('idCategoria',data.idCategoria);

    return this.http.post(`${this.urlBase}/producto`,fd);
 
  } 
  modificar(data){
    const fd = new FormData();
    fd.append('nombre', data.nombre);
    fd.append('precio_compra', data.precio_compra);
    fd.append('precio_venta', data.precio_venta);
    fd.append('stock', data.stock);
    fd.append('descripcion', data.descripcion);
    fd.append('imagen', data.imagen);
    fd.append('idCategoria',data.idCategoria);

    return this.http.put(`${this.urlBase}/producto/${data._id}/${data.img_name}`,fd);
  }

}
