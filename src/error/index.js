import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import backTop from '../backTop'
import template from './template'

page('/404', header, backTop, function(ctx, next){
 var container = document.getElementById('main-container')
 empty(container).appendChild(template)
 setTimeout(function(){
  window.location.href = '/'
 }, 1000)
})