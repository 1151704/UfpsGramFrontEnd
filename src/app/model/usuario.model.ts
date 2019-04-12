
export class Usuario {

  id: number;
  nombre: string;
  email: string;
  username: string;
  password: string;
  fechaNacimiento: string;
  fechaRegistro: string;

  constructor(
    id: number,
    nombre: string,
    email: string,
    username: string,
    password: string,
    fechaNacimiento: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.username = username;
    this.password = password;
    this.fechaNacimiento = fechaNacimiento;
  }

}
