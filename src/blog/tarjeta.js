import yo from 'yo-yo'
import social from './social'

module.exports  = function(articulo){
  var el = yo`
    <a class="tarjeta" href="/blog/${articulo.titulo.replace(/ /g, '-')}">
      <div class="tarjetaImagen" style="background: url('${articulo.imagen}'); background-size: cover"></div>
      <div class="tarjetaTexto">
        <h3>${articulo.titulo}</h3>
        <h5>${articulo.fecha}</h5>
        <p>${articulo.descripcion}</p>
      </div>
      ${social(articulo)}
    </a>
  `
  return el
}
