const express = require('express')
const bodyParser = require('body-parser') //se agrega para poder coupar el post
const app = express()
const cors = require('cors') //importamos cors
const port = 3000
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
  database : 'educación'//exactamente mismo nombre que my sql
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
app.get('/Usuarios', (req:any, res:any) => { //url, coolback solicitud y respuesta
  //con conexion establecida
  connection.query("select * from usuarios", function(error:any, results:any, fields:any){
    res.send(JSON.stringify(results));
  });
  //res.send(JSON.stringify(Usuarios))
})


app.get('/Usuarios/:id', (req:any, res:any) => {
    let id = req.params.id;
    //si son mas is se pone en el quey asi [id]
    connection.query("select * from usuarios where id=?",id, function(error:any, results:any, fields:any){
      res.send(JSON.stringify(results));
    });

})


app.post('/CrearUsuarios',jsonParser,(req:any, res:any) => {//se agrega body parse almendio

    let usuario = req.body.usuario;
    let clave = req.body.clave;
    let estado = req.body.estado;
    
    connection.query("insert into usuarios (usuario,clave,estado) values(?,?,?)",[usuario,clave,estado], function(error:any, results:any, fields:any){
      res.send(JSON.stringify(results.insertId));
    });
})

app.put('/Actualizar/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio
  let id = req.params.id;
  let usuario = req.body.usuario;
  let clave = req.body.clave;
  let correo = req.body.correo;
  //preguntar como hacer de la manera en que si no hay nada no salga el mensaje de datos ceradeos
  if(usuario != "")
  {
    console.log(`Usuario:${usuario} con la clave ${clave}`);

    res.send("datos modificados");
  }
  else{
    res.send("datos no modificados");
  }
  
})

app.delete('/Eliminar/:id',jsonParser,(req:any, res:any) => {//se agrega body parse almendio
  let id = req.params.id;
  let usuario = req.body.usuario;
  let clave = req.body.clave;
  let correo = req.body.correo;
  //preguntar como hacer de la manera en que si no hay nada no salga el mensaje de datos ceradeos
  if(usuario != "")
  {
    console.log(`Usuario:${usuario} con la clave ${clave} fue eliminado`);

    res.send("datos eliminados");
  }
  else{
    res.send("datos no eliminados");
  }
  
})



app.listen(configuracion, () => { 
  console.log(`Example app listening at http://localhost:${configuracion.port}`)
})
