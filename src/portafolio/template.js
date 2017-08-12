import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import activar from './tabFunction'
import tab from './tab'
import ctrl from './carruselFunctions'

module.exports = function(portfolio){
  var el = yo`
    <main class="portfolio">
    <div className="negro"></div>
      <section class="portafolio">
        <article class="portafolioLibraries">
          ${portfolio.map(function(archivos){
            return tab(archivos)
          })}
        </article>
        <article class="portafolioViewer position1" id="portafolioViewer">
          <div>
            <div class="portfolioRiel" id="portfolioRiel">
                ${portfolio[0].elementos[0].imagenes.map(function(imagen){
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
              ${portfolio[0].elementos[0].imagenes.map(function(imagen, i){
                return yo`<a class="punto" id="posicion${i + 1}" onclick=${ctrl.moverPunto} data-posicion="${i + 1}"></a>` 
              })}
            </div>
          </div>    
        </article>
      </section>
    </main>
  `
  return el
}
