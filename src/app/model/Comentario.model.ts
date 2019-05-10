import { Usuario } from './usuario.model';

export class Comentario {

  id: number
  comentario: string
  fechaPublicacion: string
  estado: string
  usuario: Usuario

}
