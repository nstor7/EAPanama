'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ArticuloSchema = Schema({
  id: String,
  titulo: String,
  fecha: Date,
  descripcion: String,
  imagen1: String,
  imagen2: String,
  imagen3: String,
  contenido: String
})

module.exports = mongoose.model('Articulo', ArticuloSchema)
