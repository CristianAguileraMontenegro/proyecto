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
  connection.query("select * from admin", function(error:any, results:any, fields:any){
    res.send(JSON.stringify(results));
  });
})

//back-end admin



//back-end artistas y obras


app.get('/Artistas', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  connection.query("select * from artistas", function(error:any, results:any, fields:any){
    res.send(JSON.stringify(results));
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
    res.send(JSON.stringify(results.insertId));
  });
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
    res.send(JSON.stringify(results.insertId));
  });
})


app.post('/subirImagenPerfil',(req:any,res:any,next:any)=>{

  const form = formidable({});
    form.parse(req, function(err:any, fields:any, files:any) {

      // `file` is the name of the <input> field of type `file`
      console.log(files.file.originalFilename);
      let old_path = files.file.filepath;
      let index = old_path.lastIndexOf('/') + 1;
      let file_name = old_path.substr(index);
      let new_path = __dirname+"/../../front-end/src/assets/imagenesPerfil/"+files.file.originalFilename;

      console.log(new_path);
      
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
      console.log("hola");
      // `file` is the name of the <input> field of type `file`
      console.log(files.file.originalFilename);
      let old_path = files.file.filepath;
      let index = old_path.lastIndexOf('/') + 1;
      let file_name = old_path.substr(index);
      let new_path = __dirname+"/../../front-end/src/assets/obras/"+files.file.originalFilename;

      console.log(new_path);
      
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

  connection.query("SELECT * FROM obras WHERE id_DelArtista=?",idArtista, function(error:any, results:any, fields:any){
    res.send(JSON.stringify(results));
  });
  //res.send(JSON.stringify(Usuarios))
})

app.put('/modificarFotoPerfil/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio


  let id = req.body.id;
  let ulr = req.body.url;
  
  connection.query("UPDATE artistas SET fotoDePerfilULR=? WHERE id_Artistas=? ",[ulr,id], function(error:any, results:any, fields:any){
    res.send(JSON.stringify(results.insertId));
  });
})

app.put('/modificarTipoDisplay/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

  let id = req.body.id;
  let tipoDeDisplay = req.body.tipoDeDisplay;

  connection.query("UPDATE artistas SET tipoDeDisplaytipoDeDisplay=? WHERE id_Artistas=? ",[tipoDeDisplay,id], function(error:any, results:any, fields:any){
    res.send(JSON.stringify(results.insertId));
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
    res.send(JSON.stringify(results.insertId));
  });
})





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






app.listen(configuracion, () => { 
  console.log(`Example app listening at http://localhost:${configuracion.port}`)
})
