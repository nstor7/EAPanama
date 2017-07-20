'use strict'
const Articulo = require('./modelo')

 function getArticulos (req, res){
   Articulo.find({}, (err, articulos) => {
     if (err) return res.status(500).send({message: `error al realizar la petición: ${err}`})
     if(!articulos) return res.status(404).send({message: 'no existen productos'})

     res.status(200).send({articulos})
   })
 }
function getArticulo (req, res){
   let articuloId = req.params.articuloId
   Articulo.findById(articuloId, (err, articulo) => {
     if (err) return res.status(500).send({message: `error al realizar la petición: ${err}`})
     if(!articulo) return res.status(404).send({message: 'el articulo no existe'})

     res.status(200).send({articulo})
   })
 }
 function saveArticulo (req, res) {
    console.log('POST /api/product')
    console.log(req.body)

    let articulo = new Articulo()
    articulo.titulo = req.body.titulo
    articulo.fecha = new Date()
    articulo.descripcion = req.body.descripcion
    articulo.imagen1 = req.body.imagen1
    articulo.imagen2 = req.body.imagen2
    articulo.imagen3 = req.body.imagen3
    articulo.contenido = req.body.contenido

    articulo.save((err, articuloStored) => {

      if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})
      res.status(200).send({articulo: articuloStored})
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
module.exports = {getArticulos, getArticulo, saveArticulo, deleteArticulo}