const express = require('express')
const app = express()
const mailer = require('express-mailer')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('*', function(req, res){
 res.render('index.pug')
})

mailer.extend(app, {
  host: 'wo08@wiroos.com',
  secureConnection: true, // use SSL
  port: 465, // port for secure SMTP
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
  auth: {
    user: 'aparedes@eapanama.com',
    pass: 'violin507cello'
  }
})

app.post('/contactar/send', function (req, res, next) {
  console.log(req.body)
  app.mailer.send('email', {
    to: 'info@eapanama.com',
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

  app.listen(443, () => {
   console.log('EAPanama corriendo en el puerto 443')
  })
