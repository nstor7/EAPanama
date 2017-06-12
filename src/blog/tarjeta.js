import yo from 'yo-yo'

module.exports  = function(articulo){
  var el = yo`
    <a class="tarjeta" href="/${articulo.titulo}">
      <div class="tarjetaImagen"></div>
      <div class="tarjetaTexto">
        <h3>${articulo.titulo}</h3>
        <h5>${articulo.fecha}</h5>
        <p>${articulo.descripcion}</p>
        <div class="social socialTarjeta">
          <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-flickr" aria-hidden="true"></i></a>
        </div>
      </div>
    </a>
  `
  return el
}
