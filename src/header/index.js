import empty from 'empty-element'
import template from './template'


module.exports = function header (ctx, next){
  var container = document.getElementById('header')
  empty(container).appendChild(template)
  next()
}
