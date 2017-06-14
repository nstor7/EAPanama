import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import backTop from '../backTop'
import articulos from '../blog/articulos'
import template from '../articulo/template'

page('/blog/:titulo', header, footer, backTop, function(ctx, next){
  console.log('uff')
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(articulos, ctx.params.titulo))
})
