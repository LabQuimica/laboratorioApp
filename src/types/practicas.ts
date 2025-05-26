export interface Practica {
  id_practica: number;
  practica_nombre: string;
  descripcion: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  num_equipos: number;
  fecha_inicio: string;
  fecha_fin: string;
  status: string;
  id_grupo: number;
  grupo_nombre: string;
  semestre: string;
  codigo: string;
}

export interface PracticaDetails {
  id_practica: number;
  nombre: string;
  descripcion: string;
  fecha_creacion: string;
  fecha_modificacion: string;
  materiales: Material[];
}
export interface Material {
  nombre: string;
  id_item: number;
  cantidad: number;
  especial: string;
}



