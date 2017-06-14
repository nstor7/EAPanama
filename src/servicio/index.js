import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'
import metaData from '../metaData'
import servicioDatos from './metaData'
import scrollFunction from '../subMenu/scrollFunction'

page('/servicio', header, backTop, footer, function(){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template)
  metaData(servicioDatos.title, servicioDatos.description, servicioDatos.keywords)
} )
