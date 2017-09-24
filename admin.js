const express = require('express')
const admin = express.Router()
const secret = require('../.secret')

admin.use(express.static('public'))

admin.get('/', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Admin', image: 'imagenes/logoRedes.jpg', url: '/admin'})
})

admin.get('/auth', function(req, res){
 user = {
  nombre: secret.nombre,
  contraseña: secret.contraseña
 }
 console.log(user.nombre)
 console.log(user.contraseña)
 res.send(user)
})

admin.get('/editor', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Editor', image: 'imagenes/logoRedes.jpg', url: '/admin/editor'})
})

admin.get('/lista', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Consola', image: 'imagenes/logoRedes.jpg', url: '/admin/lista'})
})

admin.get('/editor/:titulo', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Editor', image: 'imagenes/logoRedes.jpg', url: '/admin/titulo'})
})

module.exports = admin