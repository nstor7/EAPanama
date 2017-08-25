import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'
import portfolio from './portfolio'
import killFooter from './killFooter'

page('/portafolio', header, backTop, killFooter, function(){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(portfolio))
  document.getElementsByClassName('tabEspacio')[0].classList.add('active')
} )
