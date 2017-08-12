var posicionActual = 1 

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
module.exports = {moverIzquierda, moverDerecha, moverPunto}