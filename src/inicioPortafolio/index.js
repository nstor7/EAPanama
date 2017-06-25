import yo from 'yo-yo'
import tarjeta from './tarjeta'

module.exports = function(proyectos){
  var el = yo`
    <section class="inicioPortafolio">
      <article class="portafolioTitulo">
        <i class="fa fa-book sectionIcon" aria-hidden="true"></i>
        <h2>Portafolio</h2>
        <p>Éstos son algunos de nuestros proyectos...</p>
      </article>
      <article class="portafolioProyectos">
        ${proyectos.map(function(proyecto){
          return tarjeta(proyecto)
        })}
      </article>
    </section>
  `
  return el
}
