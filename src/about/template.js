import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main>
    ${portada(datos.about)}
    <section class="aboutPrimera">
      <article class="aboutPrimeraLaterales"></article>
      <article class="logo"></article>
      <article class="aboutPrimeraLaterales"></article>
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
  </main>
`
