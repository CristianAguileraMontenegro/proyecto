export interface Noticias {
    titulo:string;
    texto:string;
    id:number;
    imagenURL:String;
}

export let listaNoticias:Array<Noticias> = [];