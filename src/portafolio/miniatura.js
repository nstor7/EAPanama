import yo from 'yo-yo'
import viewerFunction from './viewerFunction'

module.exports = function(elemento){
  var el = yo`
    <a class="miniatura" onclick=${viewerFunction} id="${elemento.nombre}" style="background: url('${elemento.miniatura}'); background-size: cover;"></a>
  `
  return el
}
