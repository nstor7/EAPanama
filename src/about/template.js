import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main class="aboutUs">
    ${portada(datos.about)}
    <section class="aboutPrimera">
      <article class="aboutPrimeraLaterales">
        <div class="lateralesPartes">
          <hgroup>
            <h3>Personal Especializado</h3>
            <p>Ingenieros técnicos y Magísters en Acústica estudiarán los detalles de su proyecto</p>
          </hgroup>
          <i class="fa fa-check" aria-hidden="true"></i>
        </div>
        <div class="lateralesPartes">
          <hgroup>
            <h3>Técnicas Novedosas</h3>
            <p>Software de simulación propio en 2D y 3D para el desarrollo de las soluciones</p>
          </hgroup>
          <i class="fa fa-cubes" aria-hidden="true"></i>
        </div>
        <div class="lateralesPartes">
          <hgroup>
            <h3>Soluciones de calidad</h3>
            <p>Estudio exhaustivo de las condiciones existentes para diagnosticar la solución acústica óptima</p>
          </hgroup>
          <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
        </div>
      </article>
      <article class="logo"></article>
      <article class="aboutPrimeraLaterales">
        <div class="lateralesPartes derecha">
          <i class="fa fa-pencil" aria-hidden="true"></i>
          <hgroup>
            <h3>Diseño de interiores</h3>
            <p>Trabajos finales con los acabados profesionales que usted está buscando</p>
          </hgroup>
        </div>
        <div class="lateralesPartes derecha">
          <i class="fa fa-recycle" aria-hidden="true"></i>
          <hgroup>
            <h3>Materiales Reciclados</h3>
            <p>Preocupados por el medio-ambiente nuestros materiales no son nocivos para la salud como la fibra de vidrio</p>
          </hgroup>
        </div>
        <div class="lateralesPartes derecha">
          <i class="fa fa-clock-o" aria-hidden="true"></i>
          <hgroup>
            <h3>Puntualidad y limpieza</h3>
            <p>Trabajamos con orden y disciplina para que usted no se sienta invadido durante las funciones asignadas</p>
          </hgroup>
        </div>
      </article>
    </section>
    <section class="aboutSegunda">
      <article class="columna">
        <p>EA Panamá nace en la Ciudad de Panamá en el año 2014. Formada por un grupo de jóvenes emprendedores Europeos y Panameños que han apostado por ofrecer una solución a los problemas acústicos que se presentan en la Ciudad de Panamá. El principal objetivo es brindar una alta calidad en todos nuestros servicios.</p>
        <p>La corporación se compromete con el medio ambiente, preocupándose desde el origen de sus insumos hasta el impacto ambiental de la actividad empresarial.</p>
      </article>
      <article class="columna">
        <p>Esta compañía se mantiene a la vanguardia de la tecnología, por esto apuesta por un programa de investigación y desarrollo contando con especialistas con años de experiencia dedicados a la investigación en el campo de la acústica.</p>
        <p>Brindamos soluciones de alta calidad, contando con un personal altamente capacitado y relaciones de confianza con nuestrosproveedores. Soluciones con total confidencialidad e imparcialidad, aseguran la entera confianza de nuestros clientes.</p>
      </article>
      <article class="columna">
        <p>La MISIÓN de EA Panamá es proveer a nuestros clientes con Servicios, Productos y Tecnologías innovadoras, a través de la investigación y desarrollo, para dar soluciones acústicas de calidad a sus necesidades; comprometidos siempre con el medio ambiente, la sociedad y el buen servicio al cliente.</p>
        <p>Nuestra VISIÓN, ser la empresa de soluciones acústicas líder en la región, convirtiéndonos así en una referencia para el desarrollo, investigación, innovación y buen servicio.</p>
      </article>
    </section>
    <section class="aboutInfo">
      <article class="infoAncho">
        <span class="dropcap">S</span>
        <p>in duda, la continua evolución de las grandes ciudades dan como resultado inherente un aumento de los niveles de ruido ambiental. La población se ve entonces sometida a altos niveles de ruido que dificultan sus tareas diarias y cotidianas tales como estudiar, concentrarse en el trabajo, y lo que es aún más importante, el descanso. Partiendo de la base que el descanso es algo primordial y necesario para el ser humano, surge una necesidad de cambio en el nivel de vida de los habitantes de la ciudad. Por ello, la base de la empresa, y su objetivo, es ofrecer soluciones efectivas a los problemas de ruido diarios. Desde ahí, la empresa en sus gabinetes de asesoría acústica pueden analizar y estudiar en profundidad cada caso para determinar con exactitud qué es lo que el cliente necesita. Por ejemplo, resultaría insensato colocar una partición de aislamiento con un STC de 55 dB si usted sólo necesita un STC de 35 dB. Este es el pilar de la empresa, soluciones a su medida.</p>
      </article>
      <article class="infoCompuesto">
        <p>Pero no solo el confort acústico parte del aislamiento que pueda ofrecer una partición, si no que también hay que tener en cuenta cómo se comporta el sonido en el interior de una sala. Ecos, reverberación, reflexiones, focalizaciones y muchos otros parámetros son muy importantes para conseguir el resultado esperado en cualquier tipo de local. No solo existe la acústica en teatros. Imagínese que está usted en su sala de conferencia, de cristal, y a su alrededor no hay más que
superficies reflectantes; esto perjudicará notablemente que usted pueda mantener una conversación normal con sus compañeros de trabajo, o en la llamada internacional con su cliente. El diseño acústico de interiores es algo determinista para poder conseguir el resultado esperado. Materiales absorbentes, reflectantes, y difusores de sonido han de ser estudiados en profundidad y ser estratégicamente colocados para hacer su función correctamente. Si tenemos una mala disposición o distribución espacial la afectación puede ser máxima, por lo que es recomendable siempre analizar las peculiaridades de cada sala.</p>
        <div class="infoCompuestoImagen"></div>
      </article>
      <article class="infoIcons">
        <div>
          <i class="fa fa-phone" aria-hidden="true"></i>
          <h5>Contacta con nosotros y expón tu problema</h5>
        </div>
        <div>
          <i class="fa fa-pencil" aria-hidden="true"></i>
          <h5>Análisis de campo y estudio de soluciones</h5>
        </div>
        <div>
          <i class="fa fa-lightbulb-o" aria-hidden="true"></i>
          <h5>Ejecución del proyecto acústico</h5>
        </div>
      </article>
    </section>
  </main>
`
