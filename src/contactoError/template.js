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
      <h2>Puedes volver a intentar pasados unos minutos</h2>
      <h3>Disculpa por las molestias</h3>
      <a href="/contactar" class="callToAction">Contactar</a>
    </div>
  </section>
</main>
`