import empty from 'empty-element'
import template from './template'
import scrollFunction from '../header/scrollFunction'


module.exports = function header (ctx, next){
  var container = document.getElementById('header')
  empty(container).appendChild(template)
  window.addEventListener("scroll", scrollFunction)
  next()
}
