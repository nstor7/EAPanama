import page from 'page'
import header from '../header'
import footer from '../footer'
import empty from 'empty-element'
import template from './template'
import backTop from '../backTop'
import metaData from '../metaData'
import contactoDatos from './metaData'
import request from 'superagent'
import initMap from './google'

function loadUser (ctx, next){
  request
    .get('https://maps.googleapis.com/maps/api/js?key=AIzaSyBeYDiRIlaMlaRUBjOqnuRlvp69Hi-78IQ')
    .end(function(err, res){
      if(err) return console.log(err)

      next()
  })
}

page('/contactar', header, footer, backTop, function(ctx, next){
  var container = document.getElementById('main-container')
  empty(container).appendChild(template)
  metaData(contactoDatos.title, contactoDatos.description, contactoDatos.keywords)
  next()
})
