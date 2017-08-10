import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'
import portfolio from './portfolio'

page('/portafolio', header, backTop, function(){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template(portfolio))
  document.getElementsByClassName('tabEspacio')[0].classList.add('active')
  document.getElementById('portafolioViewer').style.background = "url('imagenes/" + portfolio[0].elementos[0].nombre + ".jpg')"
  document.getElementById('portafolioViewer').style.backgroundSize = "contain"
} )
