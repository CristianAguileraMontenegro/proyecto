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
    connection.query("select * from admin", function (error, results, fields) {
        res.send(JSON.stringify(results));
    });
});
//back-end admin
//back-end artistas y obras
app.get('/Artistas', function (req, res) {
    //con conexion establecida
    connection.query("select * from artistas", function (error, results, fields) {
        res.send(JSON.stringify(results));
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
    connection.query("insert into artistas (id_Artistas,nombreReal,nombreArtista,correo,contrasena,nacionalidad,descripcion,fotoDePerfilULR,tipoDeDisplaytipoDeDisplay) values(?,?,?,?,?,?,?,?,?)", [id_Artistas, nombreReal, nombreArtista, correo, contrasena, nacionalidad, descripcion, fotoDePerfilULR, tipoDeDisplaytipoDeDisplay], function (error, results, fields) {
        res.send(JSON.stringify(results.insertId));
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
    var form = formidable({});
    form.parse(req, function (err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        //console.log(files.file.originalFilename);
        var old_path = files.file.filepath;
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = old_path.substr(index);
        var new_path = __dirname + "/../../front-end/src/assets/obras/" + files.file.originalFilename;
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
app.get('/imagenPerfilArtista', function (req, res) {
    //con conexion establecida
    connection.query("select * from obras", function (error, results, fields) {
        res.send(JSON.stringify(results));
    });
    //res.send(JSON.stringify(Usuarios))
});
app.post('/GuardarObras', jsonParser, function (req, res) {
    var id = req.body.id;
    var nombre = req.body.nombre;
    var descripcion = req.body.descripcion;
    var ulr = req.body.ulr;
    var id_DelArtista = req.body.id_DelArtista;
    connection.query("insert into artistas (id,nombre,descripcion,ulr,id_DelArtista) values(?,?,?,?,?)", [id, nombre, descripcion, ulr, id_DelArtista], function (error, results, fields) {
        res.send(JSON.stringify(results.insertId));
    });
});
app.post('/GuardarImagenesYObrasEnFolder', function (req, res, next) {
    var form = formidable({});
    form.parse(req, function (err, fields, files) {
        // `file` is the name of the <input> field of type `file`
        //console.log(files.file.originalFilename);
        var old_path = files.file.filepath;
        var index = old_path.lastIndexOf('/') + 1;
        var file_name = old_path.substr(index);
        var new_path = __dirname + "/../../front-end/src/assets/imagenes/" + files.file.originalFilename;
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
app.get('/ObtenerImagenesYObrasDelFolder', function (req, res, next) {
    var directoryPath = __dirname + "/../../front-end/src/assets/imagenes/";
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
                url: "../../assets/imagenes/" + file,
            });
        });
        res.status(200).send(fileInfos);
    });
});
app.listen(configuracion, function () {
    console.log("Example app listening at http://localhost:" + configuracion.port);
});
