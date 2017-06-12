const express = require('express')
const app = express()

app.set('view engine', 'pug')

app.use(express.static('public'))

app.get('*', function(req, res){
 res.render('index.pug')
})
  app.listen(8000, () => {
   console.log('EAPanama corriendo en el puerto 3000')
  })
