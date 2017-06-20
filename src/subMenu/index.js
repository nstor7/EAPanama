import empty from 'empty-element'
import template from './template'
import secciones from '../servicio/secciones'

module.exports = function(ctx, next){
  var container = document.getElementById('subMenu')
  empty(container).appendChild(template(secciones))
}
