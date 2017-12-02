import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main>
  ${portada(datos.contactar)}
  <section class="confirmacion">
    <div class="confirmacionError">
      <i class="fa fa-times" aria-hidden="true"></i>
      <h1>Tu Mensaje no ha sido enviado</h1>
      <h5>Puedes volver a intentar</h5>
      <a href="/contactar" class="callToAction">Contactar</a>
    </div>
  </section>
</main>
`