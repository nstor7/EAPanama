const express = require('express')
const servicio = express.Router()

servicio.use(express.static('public'))

servicio.get('/', function(req, res){
 res.render('index.pug', {
  title: 'EA Panamá - Servicios',
  url: '/servicio',
  image: 'imagenes/img-logos/eapanama-logosq-text-1000x1000.png'
 })
})
servicio.get('/:titulo', function(req, res){
 res.render('index.pug', {
  title: req.params.titulo,
  url: '/servicio/req.params.titulo',
  image: 'imagenes/img-logos/eapanama-logosq-text-1000x1000.png'
 })
})

module.exports = servicio