import yo from 'yo-yo'
import ctrl from './carruselFunctions'

module.exports = function(proyecto){
  var el = yo`
    <a  class="proyecto" data-imagenes="${proyecto.imagenes}" onclick=${ctrl.introducirViewer}>
    <div class="piko"></div>
    <div class="proyectoLugar">
      <h4><strong>${proyecto.nombre}</strong> ${proyecto.area}</h4>
    </div>
    <div class="proyectoImagen" style="background: url('${proyecto.imagen}'); background-size: cover"></div>
    <div class="proyectoServicio">
      <i class="fa fa-circle" aria-hidden="true"></i>
      <h5>${proyecto.servicio}</h5>
    </div>
  </a>
  `
  
  return el
}
