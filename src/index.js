import page from 'page'

page('*', function(ctx, next){
  window.scrollTo(0,0)
  next()
})
require('./home')
require('./about')
require('./blog')
require('./servicio')
require('./productos')
require('./portafolio')
require('./contactar')
require('./blogArticulo')
require('./servicioArticulo')
require('./contactoConfirmacion')
require('./contactoError')
require('./adminEditor')
require('./adminLista')
require('./adminChanger')
require('./error')
page()
