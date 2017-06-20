import yo from 'yo-yo'
import tarjeta from './tarjeta'

module.exports = function(catalogo){
  var el = yo`
    <article class="productoEstante">
      <h2><strong>${catalogo.estante}</strong>
        <span></span>
      </h2>
      <div class="productoEstanteria">
        ${catalogo.productos.map(function(producto){
            return tarjeta(producto)
        })}
      </div>
    </article>
  `
  return el
}
