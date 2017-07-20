const express = require('express')
const app = express()
const mailer = require('express-mailer')
const bodyParser = require('body-parser')
const api = require('./blog')

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use('/api', api)

app.get('/', function(req, res){
 res.render('index.pug')
})

app.get('/about', function(req, res){
 res.render('index.pug')
})

app.get('/blog', function(req, res){
 res.render('index.pug')
})

app.get('/servicio', function(req, res){
 res.render('index.pug')
})

app.get('/productos', function(req, res){
 res.render('index.pug')
})

app.get('/portafolio', function(req, res){
 res.render('index.pug')
})

app.get('/contactar', function(req, res){
 res.render('index.pug')
})

app.get('/blog/:titulo', function(req, res){
  var titulo = res.titulo
 res.render('index.pug')
})

app.get('/servicioArticulo', function(req, res){
 res.render('index.pug')
})

app.get('/contactoConfirmacion', function(req, res){
 res.render('index.pug')
})

mailer.extend(app, {
  host: 'smtp.gmail.com',
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'nstor777@gmail.com',
    pass: 'violin507cello'
  }
})

app.post('/contactar/send', function (req, res, next) {
  console.log(req.body)
  app.mailer.send('email', {
    to: 'nstor777@gmail.com',
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
      res.redirect('/email-error');
      return
    }
    res.redirect('/email-confirmacion');
  });
})

module.exports = app