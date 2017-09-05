import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'
import catalogo from './catalogo'
import metaData from '../metaData'
import datos from './metaData'

page('/productos', header, backTop, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(catalogo))
  metaData(datos.title, datos.description, datos.keywords)
  next()
}, footer )
