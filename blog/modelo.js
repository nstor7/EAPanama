'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticuloSchema = Schema({
  id: String,
  titulo: String,
  fecha: String,
  descripcion: String,
  keywords: String,
  imagen: String,
  contenido: Array
})

module.exports = mongoose.model('Articulo', ArticuloSchema)
