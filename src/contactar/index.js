import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'
import metaData from '../metaData'
import contactoDatos from './metaData'
import googleApi from './googleApi'

page('/contactar', header, backTop,  function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template)
  metaData(contactoDatos.title, contactoDatos.description, contactoDatos.keywords)
  googleApi()
  next()
}, footer)
