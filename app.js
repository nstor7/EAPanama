const express = require('express')
const app = express()
const mailer = require('express-mailer')
const bodyParser = require('body-parser')
const api = require('./blog')
const admin = require('./admin')
const servicio = require('./servicios')
const blog = require('./articulos')
const secret = require('../.secret')

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use('/api', api)

app.use('/admin', admin)

app.use('/servicio', servicio)

app.use('/blog', blog)

app.get('/', function(req, res){
 res.render('index.pug',{
   title: 'EA Panamá - Home',
   keywords: 'Acondicionamiento acústico, Aislamiento acústico, Control de ruido industrial, Instalaciones de audio, Venta de materiales acústicos.',
   description:'En EA Panamá ofrecemos todo tipo de soluciones acústicas de calidad en los campos de aislamiento en la edificación, acústica medioambiental, diseño y acondicionamiento de recintos, instalaciones audiovisuales así como venta de materiales acústicos, sonógrafos y equipos de audio.',
   image: 'logoRedes.jpg'
 })
})

app.get('/about', function(req, res){
 res.render('index.pug', {
   title: 'EA Panamá - Nosotros',
   keywords: 'Panamá Acústica, Panamá ruido, Panamá aislamiento, Panamá eco, Panamá, acústica.',
   description:'Empresa Acústica con servicios únicos y de calidad en Panamá. EA Panamá fue creada en 2014.',
   image: 'logoRedes.jpg'
 })
})

app.get('/productos', function(req, res){
 res.render('index.pug', {
   title: 'EA Panamá - Productos',
   keywords: 'Materiales acústicos, altavoces, foams, aislantes, cuadros acústicos, lana de roca',
   description: 'Productos acústicos de calidad y 100 % renovables para el acondicionamiento de salas. Venta de equipos de audio profesionales',
   image: 'logoRedes.jpg'
 })
})

app.get('/portafolio', function(req, res){
 res.render('index.pug', {title: 'EA Panamá - Portafolio',
 image: 'logoRedes.jpg'})
})

app.get('/contactar', function(req, res){
 res.render('index.pug', {
   title: 'EA Panamá - Contacto',
   keywords: 'Panamá Acústica, Panamá ruido, Panamá aislamiento, Panamá eco, Panamá, acústica.',
   description: 'Consulta información, cotizaciones o pide cita con uno de nuestros comerciales para su problema acústico o problema de ruido.',
   image: 'http://sumergidapro.com/imagenes/logoRedes.jpg'
 })
})

app.get('/confirmacion', function(req, res){
 res.render('index.pug', {
   title: 'EA Panamá - Contacto',
   keywords: 'Panamá Acústica, Panamá ruido, Panamá aislamiento, Panamá eco, Panamá, acústica.',
   description: 'Consulta información, cotizaciones o pide cita con uno de nuestros comerciales para su problema acústico o problema de ruido.',
   image: 'http://sumergidapro.com/imagenes/logoRedes.jpg'
 })
})

app.get('/error', function(req, res){
  res.render('index.pug', {
   title: 'EA Panamá - Contacto',
   keywords: 'Panamá Acústica, Panamá ruido, Panamá aislamiento, Panamá eco, Panamá, acústica.',
   description: 'Consulta información, cotizaciones o pide cita con uno de nuestros comerciales para su problema acústico o problema de ruido.',
   image: 'http://sumergidapro.com/imagenes/logoRedes.jpg'
 })
})
mailer.extend(app, {
  host: 'smtp.gmail.com',
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: secret.mailuser,
    pass: secret.mailpsw
  }
})

app.post('/contactar/send', function (req, res, next) {
  console.log(req.body)
  app.mailer.send('email', {
    to: secret.mailaddress,
    subject: 'email enviado desde la pagina de contacto',
    mensaje: {
      name: req.body.nombre,
      email: req.body.email,
      phone: req.body.telefono,
      subject: req.body.message
    }
  }, function (err) {
    if (err) {
      // handle error
      console.log(err);
      return res.redirect('/error')
    }
    res.redirect('/confirmacion');
  });
})
app.get('/404', function(reg, res){
  res.render('index.pug')
})

app.use(function(reg, res){
  res.status(404).redirect('/404')
})

module.exports = app