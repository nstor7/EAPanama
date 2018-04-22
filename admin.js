const express = require('express')
const admin = express.Router()
const secret = require('../.secret')

admin.use(express.static('public'))

admin.get('/', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Admin', image: 'imagenes/img-logos/eapanama-logosq-text-1000x1000.png', url: '/admin'})
})

admin.get('/auth', function(req, res){
 user = {
  nombre: secret.nombre,
  contraseña: secret.contraseña
 }
 res.send(user)
})

admin.get('/editor', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Editor', image: 'imagenes/img-logos/eapanama-logosq-text-1000x1000.png', url: '/admin/editor'})
})

admin.get('/lista', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Consola', image: 'imagenes/img-logos/eapanama-logosq-text-1000x1000.png', url: '/admin/lista'})
})

admin.get('/editor/:titulo', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Editor', image: 'imagenes/img-logos/eapanama-logosq-text-1000x1000.png', url: '/admin/titulo'})
})

module.exports = admin