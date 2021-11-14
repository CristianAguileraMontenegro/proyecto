import { Obras } from "./obras";

export interface Artistas {
    id:number;
    nombreReal:string;
    nombreArtista:string;
    correo:string;
    contrasena:string;
    nacionalidad:string;
    obrasArtista:Array<Obras>;
    fotoDePerfil:File;
    tipoDeDisplay:number;
}

export let listaArtistas:Array<Artistas> = [];