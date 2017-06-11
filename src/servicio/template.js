import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main>
    ${portada(datos.servicios)}
      <section class="noHomeSection">
        <div class="serviciosImagen"></div>
        <div class="serviciosTexto">
          <h2>ACONDICIONAMIENTO ACÚSTICO</h2>
          <p>
            Uno de los mayores problemas del audio es la sala dónde se reproduce el mismo. Ofrecemos a cada cliente un diseño personalizado para bares, discotecas, restaurantes, salas de conferencias, casas particulares, teatros, etc… ; con lo que logramos optimizar las características de la sala y la calidad del sonido. Para ello utilizamos las últimas técnicas en simulación que nos permiten valorar previamente la distribución del sonido en la sala.
          </p>
          <a href="" class="callToAction">MÁS INFORMACIÓN</a>
        </div>
      </section>
      <section class="noHomeSection">
        <div class="serviciosTexto">
          <h2>AISLAMIENTO ACÚSTICO</h2>
          <p>
            Convivimos diariamente con focos de ruido y vibraciones que nos impiden realizar nuestra actividad cotidiana. En EA Panamá somos conscientes de este problema y ofrecemos diseños de sistemas de aislamiento acústico exclusivos para cada caso, con objeto de evitar interferencias entre recintos colindantes y de esta forma evitar la trasmisión no deseada de ruidos y vibraciones.
          </p>
          <a href="" class="callToAction">MÁS INFORMACIÓN</a>
        </div>
        <div class="serviciosImagen"></div>
      </section>
      <section class="noHomeSection">
        <div class="serviciosImagen"></div>
        <div class="serviciosTexto">
          <h2>CONTROL DE RUIDO INDUSTRIAL</h2>
          <p>
            La salud auditiva en el entorno de trabajo es de vital importancia para una buena higiene laboral. EA Panamá elabora informes de medidas del ruido industrial además de ofrecer planes de acciones contra los ruidos generados por las diversas maquinarias dentro de las fábricas. De este modo, la industria puede seguir con los más altos estándares de calidad en higiene laboral estipulados por normativas internacionales así como la Organización Mundial de la Salud (OMS).
          </p>
          <a href="" class="callToAction">MÁS INFORMACIÓN</a>
        </div>
      </section>
      <section class="noHomeSection">
        <div class="serviciosTexto">
          <h2>INTEGRACIÓN DE AUDIO Y VÍDEO</h2>
          <p>
            Dedicamos una división de la empresa de manera exclusiva para la instalación de equipos de audio y vídeo tanto a particulares como a empresas. Nuestros expertos valorarán el recinto así como los equipos necesarios para obtener el mayor rendimiento de la instalación y la sala.
          </p>
          <a href="" class="callToAction">MÁS INFORMACIÓN</a>
        </div>
        <div class="serviciosImagen"></div>
      </section>
      <section class="noHomeSection">
        <div class="serviciosImagen"></div>
        <div class="serviciosTexto">
          <h2>VENTA DE MATERIALES</h2>
          <p>
            Tenemos una amplia variedad de materiales y colores, ya sea que esté buscando reducir los niveles de ruido internos de la sala por medio de la reducción de los tiempos de reverberación o bloquear la transferencia del ruido aéreo o vibraciones. Contamos con packs de materiales para aislamiento acústico y acondicionamiento acústico según el nivel de sus necesidades. Disponemos de absorbentes de sonido que coincidirán con el diseño deseado. Opciones custom donde podrá elegir formas y colores. Nuestros materiales son reciclados y/o minerales, totalmente inocuos para la salud, además de créditos LEED.
          </p>
          <a href="" class="callToAction">VER PRODUCTOS</a>
        </div>
      </section>
  </main>
`
