import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'
import metaData from '../metaData'
import aboutDatos from './metaData'

page('/about', header, backTop, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template)
  metaData(aboutDatos.title, aboutDatos.description, aboutDatos.keywords)
  next()
}, footer )
