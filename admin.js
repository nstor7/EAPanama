const express = require('express')
const admin = express.Router()
const secret = require('../.secret')

admin.use(express.static('public'))

admin.get('/', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Admin'})
})

admin.get('/auth', function(req, res){
 user = {
  nombre: secret.nombre,
  contraseña: secret.contraseña
 }
 res.send(user)
})

admin.get('/editor', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Editor'})
})

admin.get('/lista', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Consola'})
})

admin.get('/editor/:titulo', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Editor'})
})

module.exports = admin