import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import template from './template'

page('/confirmacion', header, footer, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template)
})