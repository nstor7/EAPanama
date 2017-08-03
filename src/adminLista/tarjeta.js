import yo from 'yo-yo'
import fn from './listaFunctions'

module.exports  = function(articulo){
  var el = yo`
    <div class="tarjeta">
      <div class="tarjetaImagen" style="background: url('${articulo.imagen}'); background-size: cover"></div>
      <div class="tarjetaTexto">
        <h3>${articulo.titulo}</h3>
        <h5>${articulo.fecha}</h5>
        <p>${articulo.descripcion}</p>
        <a className="callToAction mitad" href="/blog/${articulo.titulo.replace(/ /g, '-')}">Ver</a>
        <a href="/admin/editor/${articulo.titulo.replace(/ /g, '-')}" className="callToAction mitad">Editar</a>
        <a onclick=${fn.borrar} data-id="${articulo._id}" className="callToAction mitad">Borrar</a> 
      </div>
    </div>
  `
  return el
}