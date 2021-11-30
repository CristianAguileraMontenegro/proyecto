const express = require('express')
const app = express();
const bodyParser = require('body-parser') //se agrega para poder coupar el post

const formidable = require('formidable');
const form = new formidable.IncomingForm();

const cors = require('cors') //importamos cors
const fs = require('fs');
const path = require('path');
const configuracion = {
    server:"127.0.0.1",
    port:3000
};


//mysql
const mysql=require("mysql");
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',//en la tabla user
  password : '',
  port : '3306',//de xamp
  database : 'espacios publicos'//exactamente mismo nombre que my sql
});

connection.connect(function(err:any) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
 
  console.log('coneccion realizada ' + connection.threadId);
});

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(cors());
//CRUD: create(post), read(get), update(put), delete(delete)


//back-end admin

app.get('/Admin', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  let admin:any;
  connection.query("select * from admin", function(error:any, results:any, fields:any){

    if (error) {
      res.status(404).send("No se encontro el perfil de administrador verifique su creación")
    }
    else{
      
      for (let row of results) {
        admin={id_Admin:row.id_Admin, correo:row.correo, contraseña:row.contraseña};
      }

        res.status(200).send({"status":"Admin encontrado y cargado", "items":admin});
       
      console.log("Admistrador encontrado");
    }
  });
})

//back-end admin



//back-end artistas y obras


app.get('/Artistas', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  let artistas:Array<any> =[];
  connection.query("select * from artistas", function(error:any, results:any, fields:any){

     if (error) {
      res.status(404).send("No se encontraron artistas verifique que se encuentre conectado a la base de datos");
    }
    else{
      for (let row of results) {
        artistas.push(row);
      }
     

      res.status(200).send({"status":"artista ok", "items":artistas});
      console.log("Artistas obtenidos");
    }
  });
  //res.send(JSON.stringify(Usuarios))
})

app.get('/Artistas/:id', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  const id_Artista = req.params.id;
  let artistas:Array<any> =[];
  connection.query("SELECT * FROM artistas WHERE id_ArtistaS=?", id_Artista,function(error:any, results:any, fields:any){

    if (error) {
      res.status(404).send("No se encontraron el artista verifique que se encuentre conectado a la base de datos o este creado");
      console.log(error);
    }
    else{
      for (let row of results) {
        artistas.push(row);
      }
      

      if (artistas.length != 0) {
        res.status(200).send({"status":"artista encontrado", "items":artistas});
        console.log("Artista"+id_Artista+"obtenidos");
        
      }
      else{
        res.status(404).send("No se encontraron el artista verifique que se encuentre conectado a la base de datos o este creado");
      }

      
    }
  });
  //res.send(JSON.stringify(Usuarios))
})

app.post('/GuardarArtistas',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  
  let id_Artistas = req.body.id;
  let nombreReal = req.body.nombreReal;
  let nombreArtista = req.body.nombreArtista;
  let correo = req.body.correo;
  let contrasena = req.body.contrasena;
  let nacionalidad = req.body.nacionalidad;
  let descripcion	= req.body.descripcion;
  let fotoDePerfilULR = req.body.fotoDePerfilULR;
  let tipoDeDisplaytipoDeDisplay = req.body.tipoDeDisplay;


  connection.query("insert into artistas (id_Artistas,nombreReal,nombreArtista,correo,contrasena,nacionalidad,descripcion,fotoDePerfilULR,tipoDeDisplaytipoDeDisplay) values(?,?,?,?,?,?,?,?,?)",[id_Artistas,nombreReal,nombreArtista,correo,contrasena,nacionalidad,descripcion,fotoDePerfilULR,tipoDeDisplaytipoDeDisplay], function(error:any, results:any, fields:any){
    if (error) {
      res.send(error);
    }
    else{
      res.status(201).send({"status":"Artista Creado y guardado", "items":JSON.stringify(results.insertId)});
    }
    
  });
})

app.post('/GuardarObrasEnTabla',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let nombre = req.body.nombre;
  let descripcion = req.body.descripcion;
  let ulr = req.body.ulr;
  let id_DelArtista = req.body.idArtista;

  
  
  connection.query("insert into obras (id,nombre,descripcion,ulr,id_DelArtista) values(?,?,?,?,?)",[id,nombre,descripcion,ulr,id_DelArtista], function(error:any, results:any, fields:any){
    if (error) {
      res.send(error);
    }
    else{
      res.status(201).send({"status":"Obra creada y guardada", "items":JSON.stringify(results.insertId)});
    }
   
  });
})


app.post('/subirImagenPerfil',(req:any,res:any,next:any)=>{

  const form = formidable({});
    form.parse(req, function(err:any, fields:any, files:any) {

      // `file` is the name of the <input> field of type `file`
     
      let old_path = files.file.filepath;
      let index = old_path.lastIndexOf('/') + 1;
      let file_name = old_path.substr(index);
      let new_path = __dirname+"/../../front-end/src/assets/imagenesPerfil/"+files.file.originalFilename;

      
      
      fs.readFile(old_path, function(err:any, data:any) {
        
        fs.writeFile(new_path, data, function(err:any) {
          
            fs.unlink(old_path, function(err:any) {
              
                if (err) {
                    res.status(500);
                    res.json({'success': false});
                } else {
                  
                    res.status(200);
                    res.json({'success': true,'path':new_path});
                  
                }
            });
        });
    });
    //res.json({ fields, files });
  });
});

app.post('/subirObras',(req:any,res:any,next:any)=>{

  
  const form1 = formidable({});
  
    form1.parse(req, function(err:any, fields:any, files:any) {
      
      // `file` is the name of the <input> field of type `file`
      
      let old_path = files.file.filepath;
      let index = old_path.lastIndexOf('/') + 1;
      let file_name = old_path.substr(index);
      let new_path = __dirname+"/../../front-end/src/assets/obras/"+files.file.originalFilename;

      
      
      fs.readFile(old_path, function(err:any, data:any) {
        
        fs.writeFile(new_path, data, function(err:any) {
          
            fs.unlink(old_path, function(err:any) {
              
                if (err) {
                    res.status(500);
                    res.json({'success': false});
                } else {
                  
                    res.status(200);
                    res.json({'success': true,'path':new_path});
                  
                }
            });
        });
    });
    //res.json({ fields, files });
  });
});

app.get('/ObrasEspecificas/:id', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  const idArtista = req.params.id;
  let Obras:Array<any> = [];
  connection.query("SELECT * FROM obras WHERE id_DelArtista=?",idArtista, function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
      
    }
    else{

      for (let row of results) {
        Obras.push(row);
      }
      

      
        res.status(200).send({"status":"Obras encontradas", "items":Obras});
        console.log("Obras del artista"+idArtista+"obtenidas");
        
     
    }
    
  });
  //res.send(JSON.stringify(Usuarios))
})

app.put('/modificarFotoPerfil/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio


  let id = req.body.id;
  let ulr = req.body.url;
  
  connection.query("UPDATE artistas SET fotoDePerfilULR=? WHERE id_Artistas=? ",[ulr,id], function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Foto de perfil modificada", "items":JSON.stringify(results.insertId)});
    }
    
  });
})

app.put('/modificarTipoDisplay/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let tipoDeDisplay = req.body.tipoDeDisplay;

  connection.query("UPDATE artistas SET tipoDeDisplaytipoDeDisplay=? WHERE id_Artistas=? ",[tipoDeDisplay,id], function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Tipo de perfil modificado", "items":JSON.stringify(results.insertId)});
    }
  });
})

app.put('/modificarDatosArtista/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let correo = req.body.correo;
  let contrasena = req.body.contrasena;
  let nombreReal = req.body.nombreReal;
  let nombreArtista = req.body.nombreArtista;
  let nacionalidad = req.body.nacionalidad;
  let descripcion = req.body.descripcion; 

  connection.query("UPDATE artistas set nombreReal=?, nombreArtista=?, correo=?, contrasena=?, nacionalidad=?, descripcion=? WHERE id_Artistas=? ",[nombreReal,nombreArtista,correo,contrasena,nacionalidad,descripcion,id], function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Artista modificado", "items":JSON.stringify(results.insertId)});
    }
  });
})

app.put('/modificarDatosObra/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let nombre = req.body.nombre
  let descripcion = req.body.descripcion; 
  let ulr = req.body.ulr;
  let id_DelArtista = req.body.id_DelArtista;

  console.log("hola");
  
  connection.query("UPDATE obras set nombre=?, descripcion=?, ulr=? WHERE id_DelArtista=? AND id =?",[nombre,descripcion,ulr,id_DelArtista,id], function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Obra modificado", "items":JSON.stringify(results.insertId)});
    }
  });
})

app.delete('/EliminarArtista/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio
  let id = req.params.id;
  
  connection.query("DELETE FROM artistas WHERE id_Artistas=? ",id, function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Artista Eliminado", "items":JSON.stringify(results.insertId)});
    }
  });
  
});

app.delete('/EliminarObrasArtista/:id',jsonParser,(req:any, res:any) => {//elimina todas las obras de un artista
  let id = req.params.id;
  
  connection.query("DELETE FROM obras WHERE id_DelArtista=? ",id, function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Obras Eliminada", "items":JSON.stringify(results.insertId)});
    }
  });
  
});

app.delete('/EliminarObraEspecifica/:nombre',jsonParser,(req:any, res:any) => {//se agrega body parse almendio
  
  let nombre = req.params.nombre;
  
  connection.query("DELETE FROM obras WHERE nombre=?",nombre, function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Obra Eliminada", "items":JSON.stringify(results.insertId)});
    }
  });
  
});

app.get('/ObtenerNombreObras',(req:any, res:any) =>{

  let obras:Array<any> = [];
  connection.query("select nombre from obras", function(error:any, results:any, fields:any){

    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else
    {
      for (let row of results) {
      obras.push(row);
      }
      

      if (obras.length != 0) {
        res.status(200).send({"status":"obras encontradas", "items":obras});
        
      }
      else{
        res.status(404).send("No se encontraron los nombres de las obras verifiquen si estan creadas");
      }
    }
    

  });

});

app.get('/ObtenerNombreObrasArtista/:id',(req:any, res:any) =>{

  let id = req.params.id;
  let obras:Array<any> = [];
  connection.query("SELECT nombre FROM obras WHERE id_DelArtista=?",id, function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else
    {
      for (let row of results) {
      obras.push(row);
      }
      

      if (obras.length != 0) {
        res.status(200).send({"status":"obras encontradas", "items":obras});
        
      }
      else{
        res.status(404).send("No se encontraron los nombres de las obras verifiquen si estan creadas");
      }
    }
  });
});

//obtener imganes de folders

app.get('/ObtenerImagenesDePerfilDelFolder',(req:any,res:any,next:any)=>{
  const directoryPath = __dirname+"/../../front-end/src/assets/imagenesPerfil/";
  fs.readdir(directoryPath, function (err:any, files:any) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos:any = [];

    files.forEach((file:any) => {
      fileInfos.push({
        name: file,
        url: "../../assets/imagenesPerfil/"+file,
      });
    });

    res.status(200).send(fileInfos); 
  });  
});

app.get('/ObtenerObrasDelFolder',(req:any,res:any,next:any)=>{
  const directoryPath = __dirname+"/../../front-end/src/assets/obras/";
  fs.readdir(directoryPath, function (err:any, files:any) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos:any = [];

    files.forEach((file:any) => {
      fileInfos.push({
        name: file,
        url: "../../assets/obras/"+file,
      });
    });

    res.status(200).send(fileInfos); 
  });  
});

//obtener imganes de folders

//noticias
app.post('/GuardarNoticiasEnTabla',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let titulo = req.body.titulo;
  let texto = req.body.texto;
  let imagenURL = req.body.imagenURL;

  
  connection.query("insert into noticias (titulo,texto,id,imagenURL) values(?,?,?,?)",[titulo,texto,id,imagenURL], function(error:any, results:any, fields:any){

    if (error) {
      res.send(error);
    }
    else{
      res.status(201).send({"status":"Noticia creada y guardada", "items":JSON.stringify(results.insertId)});
    }
    
  });
});

app.get('/Noticias', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  let noticias:Array<any> = [];
  connection.query("select * from noticias", function(error:any, results:any, fields:any){

    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else
    {
      for (let row of results) {
        noticias.push(row);
        console.log(row);
      }
      console.log(results);

      if (noticias.length != 0) {
        res.status(200).send({"status":"Noticias Encontradas encontradas", "items":noticias});
        
      }
      else{
        res.status(404).send("No se encontraron las noticias verifiquen si estan creadas");
      }
    }
    
  });
  //res.send(JSON.stringify(Usuarios))
});

app.get('/NoticiaEspecificas/:id', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  const id = req.params.id;
  let noticias:Array<any> = [];
  connection.query("SELECT * FROM noticias WHERE id=?",id, function(error:any, results:any, fields:any){

    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else
    {
      for (let row of results) {
        
        noticias.push(row);
        console.log(row);
      }
      console.log(results);

      if (noticias.length != 0) {
        res.status(200).send({"status":"Noticia encontrada", "items":noticias});
        
      }
      else{
        res.status(404).send("No se encontraron las noticias verifiquen si estan creadas");
      }
    }
  });
  //res.send(JSON.stringify(Usuarios))
});

app.put('/ModificarNoticia/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let titulo = req.body.titulo;
  let texto = req.body.texto;
  let imagenURL = req.body.imagenURL;

  connection.query("UPDATE noticias set titulo=?, texto=?, imagenURL=? WHERE id=? ",[titulo,texto,imagenURL,id], function(error:any, results:any, fields:any){

    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Noticia modificada", "items":JSON.stringify(results.insertId)});
    }
  });
});

app.delete('/EliminarNoticia/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio
  let id = req.params.id;
  
  connection.query("DELETE FROM noticias WHERE id=? ",id, function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Noticia eliminada", "items":JSON.stringify(results.insertId)});
    }
  });
  
});

app.post('/subirNoticia',(req:any,res:any,next:any)=>{

  
  const form1 = formidable({});
  
    form1.parse(req, function(err:any, fields:any, files:any) {
      
      // `file` is the name of the <input> field of type `file`
     
      let old_path = files.file.filepath;
      let index = old_path.lastIndexOf('/') + 1;
      let file_name = old_path.substr(index);
      let new_path = __dirname+"/../../front-end/src/assets/noticias/"+files.file.originalFilename;

      
      
      fs.readFile(old_path, function(err:any, data:any) {
        
        fs.writeFile(new_path, data, function(err:any) {
          
            fs.unlink(old_path, function(err:any) {
              
                if (err) {
                    res.status(500);
                    res.json({'success': false});
                } else {
                  
                    res.status(200);
                    res.json({'success': true,'path':new_path});
                  
                }
            });
        });
    });
    //res.json({ fields, files });
  });
});

app.get('/ObtenerNoticiasDelFolder',(req:any,res:any,next:any)=>{
  const directoryPath = __dirname+"/../../front-end/src/assets/noticias/";
  fs.readdir(directoryPath, function (err:any, files:any) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos:any = [];

    files.forEach((file:any) => {
      fileInfos.push({
        name: file,
        url: "../../assets/noticias/"+file,
      });
    });

    res.status(200).send(fileInfos); 
  });  
});

//noticias


//integrante-Team

app.post('/GuardarIntegranteEnTabla',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let nombre = req.body.nombre;
  let cargo = req.body.cargo;
  let descripcion = req.body.descripcion;
  let imagen = req.body.imagen;
  
  
  
  connection.query("insert into integrante (id,nombre,cargo,descripcion,imagen) values(?,?,?,?,?)",[id,nombre,cargo,descripcion,imagen], function(error:any, results:any, fields:any){

    if (error) {
      res.send(error);
    }
    else{
      res.status(201).send({"status":"Integrante creado y guardado", "items":JSON.stringify(results.insertId)});
    }
  });
});

app.get('/Integrantes', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  let integrantes:Array<any> = [];
  connection.query("select * from integrante", function(error:any, results:any, fields:any){

    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else
    {
      for (let row of results) {
        integrantes.push(row);
      }
      console.log(results);

      if (integrantes.length != 0) {
        res.status(200).send({"status":"Integrantes encontrados y cargados", "items":integrantes});
        
      }
      else{
        res.status(404).send("No se encontraron los integrantes verifiquen si estan creadas");
      }
    }
  
  });
  //res.send(JSON.stringify(Usuarios))
});

app.get('/IntegranteEspecifico/:id', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  const id = req.params.id;
  let integrantes:Array<any> = [];
  connection.query("SELECT * FROM integrante WHERE id=?",id, function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else
    {
      for (let row of results) {
        integrantes.push(row);
      }
      console.log(results);

      if (integrantes.length != 0) {
        res.status(200).send({"status":"Integrante encontrado y cargado", "items":integrantes});
        
      }
      else{
        res.status(404).send("No se encontraron los integrantes verifiquen si estan creadas");
      }
    }
    
  });
  //res.send(JSON.stringify(Usuarios))
});

app.put('/ModificarIntegrante/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let nombre = req.body.nombre;
  let cargo = req.body.cargo;
  let descripcion = req.body.descripcion;
  let imagen = req.body.imagen;

  connection.query("UPDATE integrante set nombre=?, cargo=?, descripcion=?, imagen=? WHERE id=? ",[nombre, cargo, descripcion, imagen, id], function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Integrante modificado", "items":JSON.stringify(results.insertId)});
    }
  });
});

app.delete('/EliminarIntegrante/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio
  let id = req.params.id;
  
  connection.query("DELETE FROM integrante WHERE id=? ",id, function(error:any, results:any, fields:any){
    if (error) {
      console.log(error);
      res.status(500).send("Error de servidor verifique el estado del mismo");
    }
    else{
      res.status(200).send({"status":"Noticia eliminada", "items":JSON.stringify(results.insertId)});
    }
  });
  
});

app.post('/subirIntegrante',(req:any,res:any,next:any)=>{

  
  const form1 = formidable({});
  
    form1.parse(req, function(err:any, fields:any, files:any) {
     
      // `file` is the name of the <input> field of type `file`
     
      let old_path = files.file.filepath;
      let index = old_path.lastIndexOf('/') + 1;
      let file_name = old_path.substr(index);
      let new_path = __dirname+"/../../front-end/src/assets/integrantes/"+files.file.originalFilename;

      
      
      fs.readFile(old_path, function(err:any, data:any) {
        
        fs.writeFile(new_path, data, function(err:any) {
          
            fs.unlink(old_path, function(err:any) {
              
                if (err) {
                    res.status(500);
                    res.json({'success': false});
                } else {
                  
                    res.status(200);
                    res.json({'success': true,'path':new_path});
                  
                }
            });
        });
    });
    //res.json({ fields, files });
  });
});

app.get('/ObtenerIntegrantesDelFolder',(req:any,res:any,next:any)=>{
  const directoryPath = __dirname+"/../../front-end/src/assets/integrantes/";
  fs.readdir(directoryPath, function (err:any, files:any) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos:any = [];

    files.forEach((file:any) => {
      fileInfos.push({
        name: file,
        url: "../../assets/integrantes/"+file,
      });
    });

    res.status(200).send(fileInfos); 
  });  
});
//integrante-Team


app.listen(configuracion, () => { 
  console.log(`Example app listening at http://localhost:${configuracion.port}`)
})
