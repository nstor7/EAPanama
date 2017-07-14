import yo from 'yo-yo'
import activar from './tabFunction'
import miniatura from './miniatura'

module.exports = function(archivo){
  console.log('agragar focus')
  var el = yo`
    <div class="portafolioTab">
      <a class="tabButton" onclick=${activar} id="${archivo.id}Tab">
        <i class="fa fa-folder" aria-hidden="true"></i>
        <h4>${archivo.titulo}</h4>
      </a>
      <div id="miniaturas${archivo.id}" class="tabEspacio">
        ${archivo.elementos.map(function(elemento){
          return miniatura(elemento)
        })}
      </div>
    </div>
  `
  return el
}
