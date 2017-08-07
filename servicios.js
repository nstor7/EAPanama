const express = require('express')
const servicio = express.Router()

servicio.use(express.static('public'))

servicio.get('/', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Servicios'})
})
servicio.get('/:titulo', function(req, res){
 res.render('index.pug', {title: req.params.titulo})
})

module.exports = servicio