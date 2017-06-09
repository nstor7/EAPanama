import page from 'page'
import empty from 'empty-element'
import template from './template'
import header from '../header'
import footer from '../footer'
import backTop from '../backTop'
import funcion from '../porqueCriticas/criticaMovimientoFunction'



page('/', header, footer, backTop, function(ctx, next){
  var main = document.getElementById('main-container')
  empty(main).appendChild(template)
  funcion.movimiento()
  setInterval(funcion.movimiento, 15000)
})
