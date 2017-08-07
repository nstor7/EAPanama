import page from 'page'
import empty from 'empty-element'
import header from '../header'
import footer from '../footer'
import backTop from '../backTop'
import template from './template'
import articulos from '../blog/articulos'
import ctrl from '../admin/autenticar'

page('/admin/lista', ctrl.restrict, header, footer, backTop, articulos, function(ctx, next){
 var main = document.getElementById('main-container')
 empty(main).appendChild(template(ctx.articulos))
})