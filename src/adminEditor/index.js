import page from 'page'
import empty from 'empty-element'
import header from '../header'
import template from './template'
import backTop from '../backTop'
import footer from '../footer'

page('/admin/editor', header, backTop, footer, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template)
})