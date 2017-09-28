const express = require('express')
const blog = express.Router()
const Articulo = require('./blog/modelo')
function cargarArticulo (req, res,next){
 Articulo.find({}, (err, articulos) => {
   if (err) return res.status(500).send({message: `error al realizar la petición: ${err}`})
   if(!articulos) return res.status(404).send({message: 'no existen productos'})

   function findArticulo(articulo){
    return articulo.titulo === req.params.titulo.replace(/-/g, ' ')
   }
   articulo = articulos.find(findArticulo)
   next()
 })
}

blog.use(express.static('public'))

blog.get('/', function(req, res){
 res.render('index.pug', {
  title: 'EA Panamá - blog',
  keywords: 'Acondicionamiento acústico, Aislamiento acústico, Control de ruido industrial, Instalaciones de audio, Venta de materiales acústicos.',
  description:'En EA Panamá ofrecemos todo tipo de soluciones acústicas de calidad en los campos de aislamiento en la edificación, acústica medioambiental, diseño y acondicionamiento de recintos, instalaciones audiovisuales así como venta de materiales acústicos, sonógrafos y equipos de audio.',
  image: 'imagenes/logoRedes.jpg',
  url: '/blog'
}
 )}
)
blog.get('/:titulo', cargarArticulo, function(req, res){
 res.render('index.pug', {
  title: req.params.titulo,
  description: articulo.descripcion,
  keywords: articulo.keywords,
  image: articulo.imagen,
  url: '/blog/' + req.params.titulo
 })
})

module.exports = blog