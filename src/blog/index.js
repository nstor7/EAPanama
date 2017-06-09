import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'

page('/blog', header, footer, backTop, function(){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template)
} )
