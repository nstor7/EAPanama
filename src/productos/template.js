import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import estante from './estante'

module.exports = function(catalogo){
  var el = yo`
    <main>
      ${portada(datos.productos)}
      <section class="productosSeccion">
        <div class="oficial">
          <h5>DISTRIBUIDOR OFICIAL DE:</h5>
          <a href="http://www.acousticalsurfaces.com" class="distribuidor"></a>
        </div>
        ${catalogo.map(function(productos){
            return estante(productos)
        })}
      </section>
    </main>
  `
  return el
}
