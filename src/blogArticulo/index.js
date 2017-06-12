import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import backTop from '../backTop'
import articulos from '../blog/articulos'
import template from './template'

page('/:titulo', header, footer, backTop, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(articulos, ctx.params.titulo))
})
