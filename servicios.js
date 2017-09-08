const express = require('express')
const servicio = express.Router()

servicio.use(express.static('public'))

servicio.get('/', function(req, res){
 res.render('index.pug', {
  title: 'EA Panamá - Servicios',
  url: '/servicio',
  image: 'imagenes/logoRedes.jpg'
 })
})
servicio.get('/:titulo', function(req, res){
 res.render('index.pug', {
  title: req.params.titulo,
  url: '/servicio/req.params.titulo',
  image: 'imagenes/logoRedes.jpg'
 })
})

module.exports = servicio