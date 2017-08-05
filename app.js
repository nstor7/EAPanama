const express = require('express')
const app = express()
const mailer = require('express-mailer')
const bodyParser = require('body-parser')
const api = require('./blog')
const admin = require('./admin')
const servicio = require('./servicios')
const blog = require('./articulos')

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use('/api', api)

app.use('/admin', admin)

app.use('/servicio', servicio)

app.use('/blog', blog)

app.get('/', function(req, res){
 res.render('index.pug')
})

app.get('/about', function(req, res){
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

app.get('/confirmacion', function(req, res){
 res.render('index.pug')
})

app.get('/error', function(req, res){
  res.render('index.pug')
})


mailer.extend(app, {
  host: 'smtp.gmail.com',
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: process.env.MAILUSER,
    pass: process.env.MAILPSW
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
      return res.redirect('/error')
    }
    res.redirect('/confirmacion');
  });
})

module.exports = app