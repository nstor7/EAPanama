import yo from 'yo-yo'
import tarjeta from './tarjeta'

module.exports = function(secciones){
  var el = yo`
    <section class="unicos">
      <article class="unicosTitulo">
        <i class="fa fa-wrench sectionIcon" aria-hidden="true"></i>
        <h2>Servicios Únicos en Panamá</h2>
        <p>Múltiples opciones para hacer un proyecto integral</p>
      </article>
      <article class="unicosContenido">
        ${secciones.map(function(seccion){
          return tarjeta(seccion)
        })}
      </article>
    </section>
  `
  return el
}
