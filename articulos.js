const express = require('express')
const blog = express.Router()

blog.use(express.static('public'))

blog.get('/', function(req, res){
 res.render('index.pug', {
  title: 'EA Panamá - blog',
  keywords: 'Acondicionamiento acústico, Aislamiento acústico, Control de ruido industrial, Instalaciones de audio, Venta de materiales acústicos.',
  description:'En EA Panamá ofrecemos todo tipo de soluciones acústicas de calidad en los campos de aislamiento en la edificación, acústica medioambiental, diseño y acondicionamiento de recintos, instalaciones audiovisuales así como venta de materiales acústicos, sonógrafos y equipos de audio.'}
 )}
)
blog.get('/:titulo', function(req, res){
 res.render('articulo.pug', {
  title: req.params.titulo,
  description: req.body.descripcion,
  keywords: req.body.keywords
 })
})

module.exports = blog