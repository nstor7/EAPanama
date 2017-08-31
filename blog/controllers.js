'use strict'
const Articulo = require('./modelo')
const yo = require('yo-yo')
const ext = require('file-extension')
const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/imagenes/blog')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage }).single('imagen')

 function getArticulos (req, res){
   Articulo.find({}, (err, articulos) => {
     if (err) return res.status(500).send({message: `error al realizar la petición: ${err}`})
     if(!articulos) return res.status(404).send({message: 'no existen productos'})

     res.status(200).send({articulos})
   })
 }
function getArticulo (req, res, next){
   let articuloId = req.params.articuloId
   Articulo.findById(articuloId, (err, articulo) => {
     if (err) return res.status(500).send({message: `error al realizar la petición: ${err}`})
     if(!articulo) return res.status(404).send({message: 'el articulo no existe'})

     res.status(200).send({articulo})
     next()
   })
 }
 function saveArticulo (req, res, next) {
    let articulo = new Articulo()
    articulo.titulo = req.body.titulo
    articulo.fecha = new Date().toDateString()
    articulo.descripcion = req.body.descripcion
    articulo.keywords = req.body.keywords
    articulo.contenido = JSON.parse(req.body.contenido)
    articulo.imagen = "imagenes/blog/" + req.file.filename

    articulo.save((err, articuloStored) => {

      if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
      
        res.status(200).send({articulo: articuloStored})
     })
   }
function updateArticulo (req, res){
   let articuloId = req.params.articuloId
    let update = req.body
    update.contenido = JSON.parse(req.body.contenido)
    if(req.file){
      update.imagen = "imagenes/blog/" + req.file.filename
    }
   Articulo.findByIdAndUpdate(articuloId, update, (err, articuloUpdate) => {
     if (err) return res.status(500).send({message: `error al actualizar el articulo`})


       res.status(200).send({articulo: articuloUpdate})
   })
 }

function deleteArticulo (req, res){

   let articuloId = req.params.articuloId

   Articulo.findById(articuloId, (err, articulo) => {
     if (err) return res.status(500).send({message: `error al borrar el articulo`})

     articulo.remove(err => {
       if (err) return res.status(500).send({message: `error al borrar el articulo`})
       res.status(200).send({message: 'El articuloo fue borrado'})
     })
   })
 }
function uploadPictures (req, res, next){
  upload(req, res, function(err){
    if(err){
      return res.status(500).send("Error Subiendo Imagen")
    }

    res.status(200)
    console.log(res)
    next()
  })
}
module.exports = {getArticulos, getArticulo, saveArticulo, updateArticulo, deleteArticulo, uploadPictures}