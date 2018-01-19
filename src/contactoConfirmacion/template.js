import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports= yo`
<main>
  ${portada(datos.contactar)}
  <section class="confirmacion">
    <div class="confirmacionInfo">
      <i class="fa fa-check" aria-hidden="true"></i>
      <h2>Tu Mensaje ha sido enviado</h2>
      <h5>Puedes echar un vistazo a nuestros servicios</h5>
      <a href="/servicio" class="callToAction">Servicios</a>
    </div>
  </section>
</main>
`
