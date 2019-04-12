export class JwtResponse {
  accessToken: string;
  type: string;
  nombre: string;
  email: string;
  username: string;

  constructor(accessToken: string,
    type: string,
    nombre: string,
    email: string,
    username: string) {
    this.accessToken = accessToken;
    this.type = type;
    this.nombre = nombre;
    this.email = email;
    this.username = username;
  }

}
