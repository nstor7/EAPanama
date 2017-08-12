import empty from 'empty-element'
import yo from 'yo-yo'
import ctrl from './carruselFunctions'

module.exports = function (){
  var viewer = document.getElementById('portafolioViewer')
  var imagenes = this.getAttribute('data-imagenes').split(",")
  
  var agregado = yo`
  <div>
    <div class="portfolioRiel" id="portfolioRiel">
        ${imagenes.map(function(imagen){
          return yo`<div class="portfolioImagen" style="background: url('imagenes/${imagen}'); background-size: contain;"></div>`      
        })}
    </div>
    <a onclick=${ctrl.moverIzquierda} class="controles imagenBackward" id="flechaIzq">
      <i class="fa fa-angle-left" aria-hidden="true"></i>
    </a>
    <a onclick=${ctrl.moverDerecha} class="controles imagenFordward" id="flechaDer">
        <i class="fa fa-angle-right" aria-hidden="true"></i>
    </a>
    <div class="portfolioPunto" id="portfolioPunto">
      ${imagenes.map(function(imagen, i){
        return yo`<a class="punto" id="posicion${i + 1}" onclick=${ctrl.moverPunto} data-posicion="${i + 1}"></a>` 
      })}
    </div>
  </div>
  `

empty(viewer).appendChild(agregado)
    }