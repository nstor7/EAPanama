import empty from 'empty-element'
import template from './template'

module.exports = function footer (ctx, next){
  var footer = document.getElementById('footer')
  empty(footer).appendChild(template)
  next()
}
