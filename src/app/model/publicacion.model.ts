import { Usuario } from './usuario.model';
import { Etiqueta } from './etiqueta.model';
import { Comentario } from './Comentario.model';

export class Publicacion {

  id: number
  descripcion: string
  fechaPublicacion: string
  usuario: Usuario
  etiquetas: Etiqueta[];
  comentarios: Comentario[]

}
