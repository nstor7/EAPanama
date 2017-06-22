import yo from 'yo-yo'
import tarjeta from './articulo'



module.exports = function(articulos, ident){
  var el = yo`
  <main>
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
