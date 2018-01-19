import yo from 'yo-yo'

module.exports = function(producto){
  var el = yo`
    <a class="productoTarjeta" style="background: url('${producto.interna}'); background-size: contain; background-repeat: no-repeat" target="_blank">
      <h4>${producto.titulo}</h4>
      <div class="productoOver">
        <div class="productoOverImagen" style="background: url('${producto.externa}'); background-size: contain; background-repeat: no-repeat"></div>
        <p>${producto.descripcion}</p>
        eo
      </div>
    </a>
  `
  return el
}
