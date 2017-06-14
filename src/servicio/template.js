import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import subMenu from '../subMenu'
import secciones from './secciones'

module.exports = yo`
  <main>
    ${portada(datos.servicios)}
      <section class="noHomeSection">
        <div class="serviciosImagen" style="background: url('${secciones[0].ilustracion}'); background-size: cover"></div>
        <div class="serviciosTexto">
          <h2>${secciones[0].titulo}</h2>
          <p>
            ${secciones[0].explicacion}
          </p>
          <a href="/servicio/${secciones[0].titulo}" class="callToAction">MÁS INFORMACIÓN</a>
        </div>
      </section>
      <section class="noHomeSection">
        <div class="serviciosTexto">
          <h2>${secciones[1].titulo}</h2>
          <p>
            ${secciones[1].explicacion}
          </p>
          <a href="/servicio/${secciones[1].titulo}" class="callToAction">MÁS INFORMACIÓN</a>
        </div>
        <div class="serviciosImagen" style="background: url('${secciones[1].ilustracion}')"></div>
      </section>
      <section class="noHomeSection">
        <div class="serviciosImagen" style="background: url('${secciones[2].ilustracion}')"></div>
        <div class="serviciosTexto">
          <h2>${secciones[2].titulo}</h2>
          <p>
            ${secciones[2].explicacion}
          </p>
          <a href="/servicio/${secciones[2].titulo}" class="callToAction">MÁS INFORMACIÓN</a>
        </div>
      </section>
      <section class="noHomeSection">
        <div class="serviciosTexto">
          <h2>${secciones[3].titulo}</h2>
          <p>
            ${secciones[3].explicacion}
          </p>
          <a href="/servicio/${secciones[3].titulo}" class="callToAction">MÁS INFORMACIÓN</a>
        </div>
        <div class="serviciosImagen" style="background: url('${secciones[3].ilustracion}')"></div>
      </section>
      <section class="noHomeSection">
        <div class="serviciosImagen" style="background: url('imagenes/servicios-venta.png')"></div>
        <div class="serviciosTexto">
          <h2>VENTA DE MATERIALES</h2>
          <p>
            Tenemos una amplia variedad de materiales y colores, ya sea que esté buscando reducir los niveles de ruido internos de la sala por medio de la reducción de los tiempos de reverberación o bloquear la transferencia del ruido aéreo o vibraciones. Contamos con packs de materiales para aislamiento acústico y acondicionamiento acústico según el nivel de sus necesidades. Disponemos de absorbentes de sonido que coincidirán con el diseño deseado. Opciones custom donde podrá elegir formas y colores. Nuestros materiales son reciclados y/o minerales, totalmente inocuos para la salud, además de créditos LEED.
          </p>
          <a href="/productos" class="callToAction">VER PRODUCTOS</a>
        </div>
      </section>
  </main>
`
