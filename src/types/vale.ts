export interface ValeAlumnoDetails {
  id_vale: number
  nombre_alumno: string
  email_alumno: string
  boleta: string
  estado_vale: string
  observaciones_vale: string
  fecha_solicitadaVale: string
  fecha_inicio: string
  fecha_fin: string
  practica: ValeAlumnoDetailsPractica
}

export interface ValeAlumnoDetailsPractica {
  id_practica: number
  nombre_practica: string
  nombre_semestre: string
  semestre: string
  nombre_profesor: string
  materiales: ValeAlumnoDetailsMateriale[]
}

export interface ValeAlumnoDetailsMateriale {
  nombre_item: string
  tipo_item: string
  cantidad_solicitada: string
  cantidad_disponible_inventario: string
  observacion_item: string
  especial:string
}

export interface ValeProfesorDetails {
  id_practica_asignada: number;
  status_practica: string;
  fecha_inicio: string;
  fecha_fin: string;
  nombre_grupo: string;
  semestre_grupo: string;
  id_practica: number;
  nombre_practica: string;
  materiales: ValeProfesorDetailsMaterial[];
}
export interface ValeProfesorDetailsMaterial {
  nombre_item: string;
  tipo_item: string;
  ubicacion: string;
  cantidad_unitaria: string;
  observacion: string | null;
  especial: string;
  cantidad_total_necesaria: string;
}

