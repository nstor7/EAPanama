const express = require('express')
const admin = express.Router()

admin.use(express.static('public'))

admin.get('/', function(req, res){
 res.render('index.pug')
})

admin.get('/auth', function(req, res){
 user = {
  nombre: 'nstor7',
  contraseña: 'violin'
 }
 res.send(user)
})

admin.get('/editor', function(req, res){
 res.render('index.pug')
})

admin.get('/lista', function(req, res){
 res.render('index.pug')
})

admin.get('/editor/:titulo', function(req, res){
 res.render('index.pug')
})

module.exports = admin