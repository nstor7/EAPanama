import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import tarjeta from './tarjeta'

module.exports = function(articulos){
  var el = yo`
    <main>
      ${portada(datos.blog)}
      <section class="blogSection">
        ${articulos.map(function(articulo){
          return tarjeta(articulo)
        })}
      </section>
    </main>
  `
  return el
}
