import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import backTop from '../backTop'
import articulos from '../servicio/secciones'
import template from '../articulo/template'
import subMenu from '../subMenu'
import metaData from '../metaData'

page('/servicio/:titulo', header, backTop, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(articulos, ctx.params.titulo))
  var articulo = articulos.find(function(obj) { return obj.titulo.replace(/ /g, '-') == ctx.params.titulo})
  metaData(ctx.params.titulo, articulo.descripcion, articulo.keywords)
  next()
}, subMenu, footer)
