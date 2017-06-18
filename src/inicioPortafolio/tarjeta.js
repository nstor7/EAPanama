import yo from 'yo-yo'

module.exports = function(proyecto){
  var el = yo`
  <a href="#" class="proyecto">
    <div class="proyectoLugar">
      <h4><strong>${proyecto.nombre}</strong> ${proyecto.area}</h4>
      <div class="piko"></div>
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
