import empty from 'empty-element'
import yo from 'yo-yo'
var posicionActual = 1 

function introducirViewer(){
 var viewer = document.getElementById('portafolioViewer')
 var imagenes = this.getAttribute('data-imagenes').split(",")
 
 var agregado = yo`
 <div>
   <div class="portfolioRiel" id="portfolioRiel">
       ${imagenes.map(function(imagen){
         return yo`<div class="portfolioImagen" style="background: url('imagenes/${imagen}'); background-size: contain;"></div>`      
       })}
   </div>
   <a onclick=${moverIzquierda} class="controles imagenBackward" id="flechaIzq">
     <i class="fa fa-angle-left" aria-hidden="true"></i>
   </a>
   <a onclick=${moverDerecha} class="controles imagenFordward" id="flechaDer">
       <i class="fa fa-angle-right" aria-hidden="true"></i>
   </a>
   <div class="portfolioPunto" id="portfolioPunto">
     ${imagenes.map(function(imagen, i){
       return yo`<a class="punto" id="posicion${i + 1}" onclick=${moverPunto} data-posicion="${i + 1}"></a>` 
     })}
   </div>
 </div>
 `

empty(viewer).appendChild(agregado)
removerClasses(viewer, 'position')
viewer.classList.add('position1')
posicionActual = 1
   }

function verificarIzq(posicionActual){
 var flechaIzq = document.getElementById('flechaIzq')
 if(posicionActual == 1) flechaIzq.style.display = 'none'
 else flechaIzq.style.display = 'block'

}
function verificarDer(posicionActual){
 var carrousel = document.getElementById('portfolioRiel')
 var flechaDer = document.getElementById('flechaDer')
 var posicionesCantidad = carrousel.children.length
 if(posicionActual == posicionesCantidad) flechaDer.style.display = 'none'
 else flechaDer.style.display = 'block'
  setTimeout(moverAuto, 2000)
}
function removerClasses(element, clase){
 element.classList.remove(clase + '1')
 element.classList.remove(clase + '2')
 element.classList.remove(clase + '3')
 element.classList.remove(clase + '4')
 element.classList.remove(clase + '5')
}
function moverRiel(posicionActual){
 var viewer = document.getElementById('portafolioViewer') 
 removerClasses(viewer, 'position')
 var clase = 'position' + posicionActual
 viewer.classList.add(clase)
 verificarIzq(posicionActual)
 verificarDer(posicionActual)
}
function moverIzquierda(){
 posicionActual = posicionActual - 1
 moverRiel(posicionActual)
}
function moverDerecha(){
 posicionActual = posicionActual + 1 
 moverRiel(posicionActual)
}
function moverPunto(){
 posicionActual = Number(this.getAttribute('data-posicion')) 
 moverRiel(posicionActual)
}
function moverAuto(){
 var carrousel = document.getElementById('portfolioRiel')
 var posicionesCantidad = carrousel.children.length
 if(posicionActual == posicionesCantidad){
  posicionActual = 1
  moverRiel(posicionActual)
 }
 else{
  posicionActual = posicionActual + 1
  moverRiel(posicionActual)
 }
}
module.exports = {introducirViewer ,moverIzquierda, moverDerecha, moverPunto, removerClasses, posicionActual, moverAuto}