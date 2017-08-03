const express = require('express')
const servicio = express.Router()

servicio.use(express.static('public'))

servicio.get('/', function(req, res){
 res.render('index.pug')
})
servicio.get('/:titulo', function(req, res){
 res.render('index.pug')
})

module.exports = servicio