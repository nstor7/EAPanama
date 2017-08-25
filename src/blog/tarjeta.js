import yo from 'yo-yo'
import social from './social'

module.exports  = function(articulo){
  var el = yo`
    <div class="tarjeta" href="/blog/${articulo.titulo.replace(/ /g, '-')}">
      <a class="tarjetaImagen" style="background: url('${articulo.imagen}'); background-size: cover"></a>
      <a class="tarjetaTexto">
        <h3>${articulo.titulo}</h3>
        <h5>${articulo.fecha}</h5>
        <p>${articulo.descripcion}</p>
      </a>
      ${social()}
    </div>
  `
  return el
}
