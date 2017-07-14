import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import activar from './tabFunction'
import tab from './tab'

module.exports = function(portfolio){
  var el = yo`
    <main>
      ${portada(datos.portafolio)}
      <section class="portafolio">
        <article class="portafolioLibraries">
          ${portfolio.map(function(archivos){
            return tab(archivos)
          })}
        </article>
        <article class="portafolioViewer"></article>
      </section>
    </main>
  `
  return el
}
