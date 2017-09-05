import page from 'page'
import empty from 'empty-element'
import header from '../header'
import template from './template'
import backTop from '../backTop'
import footer from '../footer'
import ctrl from '../admin/autenticar'

page('/admin/editor', ctrl.restrict, header, backTop, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template)
  next()
}, footer)