'use strict'

const express = require('express')
const api = express.Router()
const ctrl = require('./controllers')


api.get('/articulos', ctrl.getArticulos)
api.get('/articulo/:articuloId', ctrl.getArticulo)
api.post('/articulo', ctrl.uploadPictures, ctrl.saveArticulo)
api.put('/articulo/:articuloId', ctrl.uploadPictures, ctrl.updateArticulo)
api.delete('/articulo/:articuloId', ctrl.deleteArticulo)

module.exports = api