

var posicion1 = function(){
  var container = document.getElementById('criticasContainer')
  container.classList.add('posicion1')
  container.classList.remove('posicion2')
  container.classList.remove('posicion3')
}
var posicion2 = function(){
  var container = document.getElementById('criticasContainer')
  container.classList.add('posicion2')
  container.classList.remove('posicion1')
  container.classList.remove('posicion3')
}
var posicion3 = function(){
  var container = document.getElementById('criticasContainer')
  container.classList.add('posicion3')
  container.classList.remove('posicion1')
  container.classList.remove('posicion2')
}
var movimiento = function(){
  setTimeout(posicion2, 5000)
  setTimeout(posicion3, 10000)
  setTimeout(posicion1, 15000)
}

module.exports = {posicion1, posicion2, posicion3, movimiento}
