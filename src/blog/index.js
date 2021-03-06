import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'
import metaData from '../metaData'
import blogDatos from './metaData'
import articulos from './articulos'

page('/blog', header, backTop, articulos, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(ctx.articulos))
  metaData(blogDatos.title, blogDatos.description, blogDatos.keywords)
  next()
}, footer)
