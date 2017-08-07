import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import backTop from '../backTop'
import articulos from '../blog/articulos'
import template from '../articulo/template'
import metaData from '../metaData'

page('/blog/:titulo', header, footer, backTop, articulos, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(ctx.articulos, ctx.params.titulo))
  var articulo = ctx.articulos.find(function(obj) { return obj.titulo.replace(/ /g, '-') == ctx.params.titulo})
  metaData(ctx.params.titulo, articulo.descripcion, articulo.keywords)
})
