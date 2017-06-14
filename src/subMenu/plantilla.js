import yo from 'yo-yo'

module.exports = function(seccion){
  var el = yo`
    <a class="subMenuSeccion" id="subMenuSeccion" >
      ${seccion.icono}
      <h4>${seccion.titulo}</h4>
    </a>
  `
  return el
}
