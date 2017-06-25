import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import estante from './estante'

module.exports = function(catalogo){
  var el = yo`
    <main>
      ${portada(datos.productos)}
      <section class="productosSeccion">
        <a href="http://www.acousticalsurfaces.com" class="distribuidor"></a>
        ${catalogo.map(function(productos){
            return estante(productos)
        })}
      </section>
    </main>
  `
  return el
}
