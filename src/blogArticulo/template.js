import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import tarjeta from './articulo'



module.exports = function(articulos, ident){
  var el = yo`
  <main>
    ${portada(datos.blog)}
    <section class="blogSection">
      ${articulos.map(function(articulo){
        if(articulo.titulo == ident){
          return tarjeta(articulo)
        }
      })
        }
    </section>
  </main>
  `
  return el
}
