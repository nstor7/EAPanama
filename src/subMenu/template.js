import yo from 'yo-yo'
import plantilla from './plantilla'

module.exports = function(secciones){
  var el = yo`
  <div class="subMenu" id="subMenu">
    ${secciones.map(function(seccion){
      return plantilla(seccion)
    })}
  </div>
  `
  return el
  next()
}
