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
    <section class="objetivo">
    <img src="imagenes/website-coming-soon.png" alt="Sección portafolio en trabajo...">
  </section>
    </main>
  `
  return el
}
