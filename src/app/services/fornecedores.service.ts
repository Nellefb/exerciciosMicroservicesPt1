import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Fornecedores } from '../interfaces/fornecedores';

@Injectable({
  providedIn: 'root'
})
export class FornecedoresService {
  private fornecedoresUrl = "http://localhost:3000/fornecedores"

  constructor(private http: HttpClient) { }

  //Esta lista virá da API
  fornecedores: Fornecedores[] = [];

  listar(): Observable<Fornecedores[]> {
    return this.http.get<Fornecedores[]>(this.fornecedoresUrl) as Observable<Fornecedores[]>
    //return this.fornecedores;
  }

  //só retorna 1 cliente
  getbyId(id: string): Observable<Fornecedores> {
    return this.http.get(`${this.fornecedoresUrl}/${id}`) as Observable<Fornecedores>
  }

  remover(id: string) {
    return this.http.delete(`${this.fornecedoresUrl}/${id}`)

    //devolve observable
  }

  httpHeader = {
    headers: {
      "Content-Type": "application/json"
    }
  }

  atualizar(fornecedor: Fornecedores) {
    return this.http.put(`${this.fornecedoresUrl}/${fornecedor.id}`, fornecedor, this.httpHeader)

  }

  adicionar(fornecedor: Fornecedores) {

    return this.http.post(this.fornecedoresUrl, fornecedor, this.httpHeader)

  }
}
