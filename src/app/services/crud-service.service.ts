import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UsuarioDB } from '../models/Usuario';

@Injectable({
  providedIn: 'root',
})
export class CrudServiceService {
  getInfo() {
    return this.httpsService.get<UsuarioDB[]>(
      environment.urlBackend + '/api/usuarios'
    );
  }

  deleteUser(id: string) {
    return this.httpsService.delete(
      environment.urlBackend + '/api/usuarios/' + id
    );
  }

  constructor(private httpsService: HttpClient) {}
}
