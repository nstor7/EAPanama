import page from 'page'
import homeDatos from './home/metaData'
import metaData from './metaData'

require('./home', metaData(homeDatos.title, homeDatos.description, homeDatos.keywords))
require('./about')
require('./blog')
require('./servicio')
require('./productos')
require('./portafolio')
require('./contactar')
page()
