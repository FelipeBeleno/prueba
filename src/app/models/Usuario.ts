export interface Usuario {
  name: string;
  password: string;
}

export interface UsuarioDB {
  email: String;
  id: String;
  idFirebase: String | string;
  identificacion: String;
  name: String;
  rol: String;
  phone: String;
  password?: String;
}
