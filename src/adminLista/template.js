import yo from 'yo-yo'
import tarjeta from './tarjeta'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = function(articulos){
  var el = yo`
  <main>
    ${portada(datos.admin)}
    <section class="blogSection">
      <a href="/admin/editor" className="callToAction">
        <i class="fa fa-plus" aria-hidden="true"></i> Agregar Artículo
      </a>
    </section>
    <section class="blogSection">
      ${articulos.map(function(articulo){
        return tarjeta(articulo)
      })}
    </section>
  </main>
    
  `
  return el
}