export class SignUpInfo {
  nombre: string;
  email: string;
  username: string;
  password: string;
  fechaNacimiento: string;

  constructor(nombre: string, username: string, email: string, password: string, fechaNacimiento: string) {
    this.nombre = nombre;
    this.username = username;
    this.email = email;
    this.password = password;
    this.fechaNacimiento = fechaNacimiento;
  }
}
