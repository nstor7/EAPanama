import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import social from '../social'

module.exports = function(articulo){
  var el = yo`
  <div>
    ${portada(articulo)}
    <section class='sectionArticulo'>
      <article class="articuloIzquierda">
        ${social()}
        <h5>${articulo.fecha}</h5>
      </article>
      <article class="articuloContenido">
        ${articulo.contenido}
      </article>
    </section>
  </div>
  `
  return el
}
