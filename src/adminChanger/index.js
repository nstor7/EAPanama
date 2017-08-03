import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import backTop from '../backTop'
import articulos from '../blog/articulos'
import template from './template'

page('/admin/editor/:titulo', header, footer, backTop, articulos, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(ctx.articulos, ctx.params.titulo))
})