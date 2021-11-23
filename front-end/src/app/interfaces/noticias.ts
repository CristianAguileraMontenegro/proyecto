export interface Noticias {
    titulo:string;
    texto:string;
    id:number;
    imagenNoticias:File;
    imagenURL:String;
}

export let listaNoticias:Array<Noticias> = [];