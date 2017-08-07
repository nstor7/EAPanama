import request from 'superagent'

var autenticar = function(ev){
 ev.preventDefault()
 var nombre = document.getElementById('nombre').value
 var password = document.getElementById('password').value
 request 
  .get('/admin/auth')
  .end(function(err, res){
   console.log(res.body)
   console.log(nombre)
   console.log(password)
   if(res.body.nombre != nombre || res.body.contraseña != password){
     window.location.href = '/admin'
   } else{
    sessionStorage.user = 'auth' 
    window.location.href = '/admin/lista'
   }
  })
}

var restrict = function(ctx, next){
 if(sessionStorage.user != 'auth'){
  window.location.href = '/admin'
 }else{
  next()
 }
 
}

module.exports = {autenticar, restrict}