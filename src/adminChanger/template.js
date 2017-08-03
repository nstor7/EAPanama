import yo from 'yo-yo'
import tarjeta from './editor'
import portada from '../cabecera'
import datos from '../cabecera/datos'



module.exports = function(articulos, ident){
  var el = yo`
  <main>
  ${portada(datos.editor)}
${articulos.map(function(articulo){
  if(articulo.titulo.replace(/ /g, '-') == ident){
    return tarjeta(articulo)
  }
})
  }
  </main>
  `
  return el
}
