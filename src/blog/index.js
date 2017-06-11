import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'

page('/blog', header, footer, backTop, function(){
  var articulos = [1, 2, 3, 4, 5, 6, 7, 4]
  console.log(articulos)
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(articulos))
})
