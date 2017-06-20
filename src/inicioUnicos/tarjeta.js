import yo from 'yo-yo'


module.exports = function(seccion){
  var el = yo`
  <a class="unicosServicios" href="/servicio/${seccion.titulo}">
    ${seccion.icono}
    <h3>${seccion.titulo}</h3>
    <p>${seccion.descripcion}</p>
  </a>
  `
  return el
}
