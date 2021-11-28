"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser'); //se agrega para poder coupar el post
var formidable = require('formidable');
var form = new formidable.IncomingForm();
var cors = require('cors'); //importamos cors
var fs = require('fs');
var path = require('path');
var configuracion = {
    server: "127.0.0.1",
    port: 3000
};
//mysql
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'espacios publicos' //exactamente mismo nombre que my sql
});
connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('coneccion realizada ' + connection.threadId);
});
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(cors());
//CRUD: create(post), read(get), update(put), delete(delete)
//back-end admin
app.get('/Admin', function (req, res) {
    //con conexion establecida
    var admin;
    connection.query("select * from admin", function (error, results, fields) {
        if (error) {
            res.status(404).send("No se encontro el perfil de administrador verifique su creación");
        }
        else {
            for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
                var row = results_1[_i];
                admin = { id_Admin: row.id_Admin, correo: row.correo, contraseña: row.contraseña };
            }
            res.status(200).send({ "status": "Admin encontrado y cargado", "items": admin });
            console.log("Admistrador encontrado");
        }
    });
});
//back-end admin
//back-end artistas y obras
app.get('/Artistas', function (req, res) {
    //con conexion establecida
    var artistas = [];
    connection.query("select * from artistas", function (error, results, fields) {
        if (error) {
            res.status(404).send("No se encontraron artistas verifique que se encuentre conectado a la base de datos");
        }
        else {
            for (var _i = 0, results_2 = results; _i < results_2.length; _i++) {
                var row = results_2[_i];
                artistas.push(row);
            }
            res.status(200).send({ "status": "artista ok", "items": artistas });
            console.log("Artistas obtenidos");
        }
    });
    //res.send(JSON.stringify(Usuarios))
});
app.get('/Artistas/:id', function (req, res) {
    //con conexion establecida
    var id_Artista = req.params.id;
    var artistas = [];
    connection.query("SELECT * FROM artistas WHERE id_ArtistaS=?", id_Artista, function (error, results, fields) {
        if (error) {
            res.status(404).send("No se encontraron el artista verifique que se encuentre conectado a la base de datos o este creado");
            console.log(error);
        }
        else {
            for (var _i = 0, results_3 = results; _i < results_3.length; _i++) {
                var row = results_3[_i];
                artistas.push(row);
            }
            if (artistas.length != 0) {
                res.status(200).send({ "status": "artista encontrado", "items": artistas });
                console.log("Artista" + id_Artista + "obtenidos");
            }
            else {
                res.status(404).send("No se encontraron el artista verifique que se encuentre conectado a la base de datos o este creado");
            }
        }
    });
    //res.send(JSON.stringify(Usuarios))
});
app.post('/GuardarArtistas', jsonParser, function (req, res) {
    var id_Artistas = req.body.id;
    var nombreReal = req.body.nombreReal;
    var nombreArtista = req.body.nombreArtista;
    var correo = req.body.correo;
    var contrasena = req.body.contrasena;
    var nacionalidad = req.body.nacionalidad;
    var descripcion = req.body.descripcion;
    var fotoDePerfilULR = req.body.fotoDePerfilULR;
    var tipoDeDisplaytipoDeDisplay = req.body.tipoDeDisplay;
    console.log(id_Artistas, nombreReal, nombreArtista, correo, contrasena, nacionalidad, descripcion, fotoDePerfilULR, tipoDeDisplaytipoDeDisplay);
    connection.query("insert into artistas (id_Artistas,nombreReal,nombreArtista,correo,contrasena,nacionalidad,descripcion,fotoDePerfilULR,tipoDeDisplaytipoDeDisplay) values(?,?,?,?,?,?,?,?,?)", [id_Artistas, nombreReal, nombreArtista, correo, contrasena, nacionalidad, descripcion, fotoDePerfilULR, tipoDeDisplaytipoDeDisplay], function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        else {
            res.status(201).send({ "status": "Artista Creado y guardado", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.post('/GuardarObrasEnTabla', jsonParser, function (req, res) {
    var id = req.body.id;
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    var ulr = req.body.ulr;
    var id_DelArtista = req.body.idArtista;
    console.log(id, nombre, descripcion, ulr, id_DelArtista);
    connection.query("insert into obras (id,nombre,descripcion,ulr,id_DelArtista) values(?,?,?,?,?)", [id, nombre, descripcion, ulr, id_DelArtista], function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        else {
            res.status(201).send({ "status": "Obra creada y guardada", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.post('/subirImagenPerfil', function (req, res, next) {
    var form = formidable({});
    form.parse(req, function (err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        console.log(files.file.originalFilename);
        var old_path = files.file.filepath;
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = old_path.substr(index);
        var new_path = __dirname + "/../../front-end/src/assets/imagenesPerfil/" + files.file.originalFilename;
        console.log(new_path);
        fs.readFile(old_path, function (err, data) {
            fs.writeFile(new_path, data, function (err) {
                fs.unlink(old_path, function (err) {
                    if (err) {
                        res.status(500);
                        res.json({ 'success': false });
                    }
                    else {
                        res.status(200);
                        res.json({ 'success': true, 'path': new_path });
                    }
                });
            });
        });
        //res.json({ fields, files });
    });
});
app.post('/subirObras', function (req, res, next) {
    var form1 = formidable({});
    form1.parse(req, function (err, fields, files) {
        console.log("hola");
        // `file` is the name of the <input> field of type `file`
        console.log(files.file.originalFilename);
        var old_path = files.file.filepath;
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = old_path.substr(index);
        var new_path = __dirname + "/../../front-end/src/assets/obras/" + files.file.originalFilename;
        console.log(new_path);
        fs.readFile(old_path, function (err, data) {
            fs.writeFile(new_path, data, function (err) {
                fs.unlink(old_path, function (err) {
                    if (err) {
                        res.status(500);
                        res.json({ 'success': false });
                    }
                    else {
                        res.status(200);
                        res.json({ 'success': true, 'path': new_path });
                    }
                });
            });
        });
        //res.json({ fields, files });
    });
});
app.get('/ObrasEspecificas/:id', function (req, res) {
    //con conexion establecida
    var idArtista = req.params.id;
    var Obras = [];
    connection.query("SELECT * FROM obras WHERE id_DelArtista=?", idArtista, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            for (var _i = 0, results_4 = results; _i < results_4.length; _i++) {
                var row = results_4[_i];
                Obras.push(row);
            }
            res.status(200).send({ "status": "Obras encontradas", "items": Obras });
            console.log("Obras del artista" + idArtista + "obtenidas");
        }
    });
    //res.send(JSON.stringify(Usuarios))
});
app.put('/modificarFotoPerfil/:id', jsonParser, function (req, res) {
    var id = req.body.id;
    var ulr = req.body.url;
    connection.query("UPDATE artistas SET fotoDePerfilULR=? WHERE id_Artistas=? ", [ulr, id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Foto de perfil modificada", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.put('/modificarTipoDisplay/:id', jsonParser, function (req, res) {
    var id = req.body.id;
    var tipoDeDisplay = req.body.tipoDeDisplay;
    connection.query("UPDATE artistas SET tipoDeDisplaytipoDeDisplay=? WHERE id_Artistas=? ", [tipoDeDisplay, id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Tipo de perfil modificado", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.put('/modificarDatosArtista/:id', jsonParser, function (req, res) {
    var id = req.body.id;
    var correo = req.body.correo;
    var contrasena = req.body.contrasena;
    var nombreReal = req.body.nombreReal;
    var nombreArtista = req.body.nombreArtista;
    var nacionalidad = req.body.nacionalidad;
    var descripcion = req.body.descripcion;
    connection.query("UPDATE artistas set nombreReal=?, nombreArtista=?, correo=?, contrasena=?, nacionalidad=?, descripcion=? WHERE id_Artistas=? ", [nombreReal, nombreArtista, correo, contrasena, nacionalidad, descripcion, id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Artista modificado", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.put('/modificarDatosObra/:id', jsonParser, function (req, res) {
    var id = req.body.id;
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    var ulr = req.body.ulr;
    var id_DelArtista = req.body.id_DelArtista;
    connection.query("UPDATE obras set nombre=?, descripcion=?, ulr=? WHERE id_DelArtista=? AND id =?", [nombre, descripcion, ulr, id_DelArtista, id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Obra modificado", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.delete('/EliminarArtista/:id', jsonParser, function (req, res) {
    var id = req.params.id;
    connection.query("DELETE FROM artistas WHERE id_Artistas=? ", id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Artista Eliminado", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.delete('/EliminarObrasArtista/:id', jsonParser, function (req, res) {
    var id = req.params.id;
    connection.query("DELETE FROM obras WHERE id_DelArtista=? ", id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Obras Eliminada", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.delete('/EliminarObraEspecifica/:nombre', jsonParser, function (req, res) {
    var nombre = req.params.nombre;
    console.log(nombre);
    connection.query("DELETE FROM obras WHERE nombre=?", nombre, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Obra Eliminada", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.get('/ObtenerNombreObras', function (req, res) {
    var obras = [];
    connection.query("select nombre from obras", function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            for (var _i = 0, results_5 = results; _i < results_5.length; _i++) {
                var row = results_5[_i];
                obras.push(row);
            }
            if (obras.length != 0) {
                res.status(200).send({ "status": "obras encontradas", "items": obras });
            }
            else {
                res.status(404).send("No se encontraron los nombres de las obras verifiquen si estan creadas");
            }
        }
    });
});
app.get('/ObtenerNombreObrasArtista/:id', function (req, res) {
    var id = req.params.id;
    var obras = [];
    connection.query("SELECT nombre FROM obras WHERE id_DelArtista=?", id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            for (var _i = 0, results_6 = results; _i < results_6.length; _i++) {
                var row = results_6[_i];
                obras.push(row);
            }
            if (obras.length != 0) {
                res.status(200).send({ "status": "obras encontradas", "items": obras });
            }
            else {
                res.status(404).send("No se encontraron los nombres de las obras verifiquen si estan creadas");
            }
        }
    });
});
//obtener imganes de folders
app.get('/ObtenerImagenesDePerfilDelFolder', function (req, res, next) {
    var directoryPath = __dirname + "/../../front-end/src/assets/imagenesPerfil/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        var fileInfos = [];
        files.forEach(function (file) {
            fileInfos.push({
                name: file,
                url: "../../assets/imagenesPerfil/" + file,
            });
        });
        res.status(200).send(fileInfos);
    });
});
app.get('/ObtenerObrasDelFolder', function (req, res, next) {
    var directoryPath = __dirname + "/../../front-end/src/assets/obras/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        var fileInfos = [];
        files.forEach(function (file) {
            fileInfos.push({
                name: file,
                url: "../../assets/obras/" + file,
            });
        });
        res.status(200).send(fileInfos);
    });
});
//obtener imganes de folders
//noticias
app.post('/GuardarNoticiasEnTabla', jsonParser, function (req, res) {
    var id = req.body.id;
    var titulo = req.body.titulo;
    var texto = req.body.texto;
    var imagenURL = req.body.imagenURL;
    console.log(id, titulo, texto, imagenURL);
    connection.query("insert into noticias (titulo,texto,id,imagenURL) values(?,?,?,?)", [titulo, texto, id, imagenURL], function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        else {
            res.status(201).send({ "status": "Noticia creada y guardada", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.get('/Noticias', function (req, res) {
    //con conexion establecida
    var noticias = [];
    connection.query("select * from noticias", function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            for (var _i = 0, results_7 = results; _i < results_7.length; _i++) {
                var row = results_7[_i];
                console.log("hola");
                noticias.push(row);
                console.log(row);
            }
            console.log(results);
            if (noticias.length != 0) {
                res.status(200).send({ "status": "Noticias Encontradas encontradas", "items": noticias });
            }
            else {
                res.status(404).send("No se encontraron las noticias verifiquen si estan creadas");
            }
        }
    });
    //res.send(JSON.stringify(Usuarios))
});
app.get('/NoticiaEspecificas/:id', function (req, res) {
    //con conexion establecida
    var id = req.params.id;
    var noticias = [];
    connection.query("SELECT * FROM noticias WHERE id=?", id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            for (var _i = 0, results_8 = results; _i < results_8.length; _i++) {
                var row = results_8[_i];
                console.log("hola");
                noticias.push(row);
                console.log(row);
            }
            console.log(results);
            if (noticias.length != 0) {
                res.status(200).send({ "status": "Noticia encontrada", "items": noticias });
            }
            else {
                res.status(404).send("No se encontraron las noticias verifiquen si estan creadas");
            }
        }
    });
    //res.send(JSON.stringify(Usuarios))
});
app.put('/ModificarNoticia/:id', jsonParser, function (req, res) {
    var id = req.body.id;
    var titulo = req.body.titulo;
    var texto = req.body.texto;
    var imagenURL = req.body.imagenURL;
    console.log(id, titulo, texto, imagenURL);
    connection.query("UPDATE noticias set titulo=?, texto=?, imagenURL=? WHERE id=? ", [titulo, texto, imagenURL, id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Noticia modificada", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.delete('/EliminarNoticia/:id', jsonParser, function (req, res) {
    var id = req.params.id;
    connection.query("DELETE FROM noticias WHERE id=? ", id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Noticia eliminada", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.post('/subirNoticia', function (req, res, next) {
    var form1 = formidable({});
    form1.parse(req, function (err, fields, files) {
        console.log("hola");
        // `file` is the name of the <input> field of type `file`
        console.log(files.file.originalFilename);
        var old_path = files.file.filepath;
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = old_path.substr(index);
        var new_path = __dirname + "/../../front-end/src/assets/noticias/" + files.file.originalFilename;
        console.log(new_path);
        fs.readFile(old_path, function (err, data) {
            fs.writeFile(new_path, data, function (err) {
                fs.unlink(old_path, function (err) {
                    if (err) {
                        res.status(500);
                        res.json({ 'success': false });
                    }
                    else {
                        res.status(200);
                        res.json({ 'success': true, 'path': new_path });
                    }
                });
            });
        });
        //res.json({ fields, files });
    });
});
app.get('/ObtenerNoticiasDelFolder', function (req, res, next) {
    var directoryPath = __dirname + "/../../front-end/src/assets/noticias/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        var fileInfos = [];
        files.forEach(function (file) {
            fileInfos.push({
                name: file,
                url: "../../assets/noticias/" + file,
            });
        });
        res.status(200).send(fileInfos);
    });
});
//noticias
//integrante-Team
app.post('/GuardarIntegranteEnTabla', jsonParser, function (req, res) {
    var id = req.body.id;
    var nombre = req.body.nombre;
    var cargo = req.body.cargo;
    var descripcion = req.body.descripcion;
    var imagen = req.body.imagen;
    console.log(id, nombre, cargo, descripcion, imagen);
    connection.query("insert into integrante (id,nombre,cargo,descripcion,imagen) values(?,?,?,?,?)", [id, nombre, cargo, descripcion, imagen], function (error, results, fields) {
        if (error) {
            res.send(error);
        }
        else {
            res.status(201).send({ "status": "Integrante creado y guardado", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.get('/Integrantes', function (req, res) {
    //con conexion establecida
    var integrantes = [];
    connection.query("select * from integrante", function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            for (var _i = 0, results_9 = results; _i < results_9.length; _i++) {
                var row = results_9[_i];
                integrantes.push(row);
            }
            console.log(results);
            if (integrantes.length != 0) {
                res.status(200).send({ "status": "Integrantes encontrados y cargados", "items": integrantes });
            }
            else {
                res.status(404).send("No se encontraron los integrantes verifiquen si estan creadas");
            }
        }
    });
    //res.send(JSON.stringify(Usuarios))
});
app.get('/IntegranteEspecifico/:id', function (req, res) {
    //con conexion establecida
    var id = req.params.id;
    var integrantes = [];
    connection.query("SELECT * FROM integrante WHERE id=?", id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            for (var _i = 0, results_10 = results; _i < results_10.length; _i++) {
                var row = results_10[_i];
                integrantes.push(row);
            }
            console.log(results);
            if (integrantes.length != 0) {
                res.status(200).send({ "status": "Integrante encontrado y cargado", "items": integrantes });
            }
            else {
                res.status(404).send("No se encontraron los integrantes verifiquen si estan creadas");
            }
        }
    });
    //res.send(JSON.stringify(Usuarios))
});
app.put('/ModificarIntegrante/:id', jsonParser, function (req, res) {
    var id = req.body.id;
    var nombre = req.body.nombre;
    var cargo = req.body.cargo;
    var descripcion = req.body.descripcion;
    var imagen = req.body.imagen;
    connection.query("UPDATE integrante set nombre=?, cargo=?, descripcion=?, imagen=? WHERE id=? ", [nombre, cargo, descripcion, imagen, id], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Integrante modificado", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.delete('/EliminarIntegrante/:id', jsonParser, function (req, res) {
    var id = req.params.id;
    connection.query("DELETE FROM integrante WHERE id=? ", id, function (error, results, fields) {
        if (error) {
            console.log(error);
            res.status(500).send("Error de servidor verifique el estado del mismo");
        }
        else {
            res.status(200).send({ "status": "Noticia eliminada", "items": JSON.stringify(results.insertId) });
        }
    });
});
app.post('/subirIntegrante', function (req, res, next) {
    var form1 = formidable({});
    form1.parse(req, function (err, fields, files) {
        console.log("hola");
        // `file` is the name of the <input> field of type `file`
        console.log(files.file.originalFilename);
        var old_path = files.file.filepath;
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = old_path.substr(index);
        var new_path = __dirname + "/../../front-end/src/assets/integrantes/" + files.file.originalFilename;
        console.log(new_path);
        fs.readFile(old_path, function (err, data) {
            fs.writeFile(new_path, data, function (err) {
                fs.unlink(old_path, function (err) {
                    if (err) {
                        res.status(500);
                        res.json({ 'success': false });
                    }
                    else {
                        res.status(200);
                        res.json({ 'success': true, 'path': new_path });
                    }
                });
            });
        });
        //res.json({ fields, files });
    });
});
app.get('/ObtenerIntegrantesDelFolder', function (req, res, next) {
    var directoryPath = __dirname + "/../../front-end/src/assets/integrantes/";
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            res.status(500).send({
                message: "Unable to scan files!",
            });
        }
        var fileInfos = [];
        files.forEach(function (file) {
            fileInfos.push({
                name: file,
                url: "../../assets/integrantes/" + file,
            });
        });
        res.status(200).send(fileInfos);
    });
});
//integrante-Team
app.listen(configuracion, function () {
    console.log("Example app listening at http://localhost:" + configuracion.port);
});
