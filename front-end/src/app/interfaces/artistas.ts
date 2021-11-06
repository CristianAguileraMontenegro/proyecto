export interface Artistas {
    id:number;
    nombreReal:string;
    nombreArtista:string;
    correo:string;
    contrasena:string;
    nacionalidad:string;
}

export let listaArtistas:Array<Artistas> = [];