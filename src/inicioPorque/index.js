import yo from 'yo-yo'
import criticaTemplate from '../porqueCriticas'
import funcion from '../porqueCriticas/criticaMovimientoFunction'


module.exports = function(criticas){
  var el =  yo`
    <section class="porque">
      <article class="porqueTitulo">
        <h2>¿ POR QUÉ TRABAJAR CON NOSOTROS ?</h2>
        <p>Como profesionales del sector ofrecemos las soluciones óptimas para cada ocasión. Trabajamos con los últimos <br> avances tecnológicos para ofrecer el mejor servicio a nuestros clientes.</p>
      </article>
      <article class="porqueContenido">
        <div class="porqueLista">
          <ul>
            <li> <span>1</span> Contacta con nuestros comerciales y expón tu problema</li>
            <li><span>2</span> Estudio del caso y/o assesoramiento técnico especializado</li>
            <li><span>3</span> Elección de materiales acústicos idóneos</li>
            <li><span>4</span> Ejecución y seguimiento de obra</li>
            <li><span>5</span> Usted disruta del servicio</li>
          </ol>
        </div>
        <div class="porqueCriticasContainer posicion1" id="criticasContainer">
          <i class="fa fa-quote-left" aria-hidden="true"></i>
          <div class="criticaPunto">
            <a class="punto" onclick=${funcion.posicion1}></a>
            <a class="punto" onclick=${funcion.posicion2}></a>
            <a class="punto" onclick=${funcion.posicion3}></a>
          </div>
          <article class="porqueCriticas">
            ${criticas.map(function(critica){
              return criticaTemplate(critica)
            })}
          </article>
        </div>
      </article>
    </section>
  `
  return el
}
