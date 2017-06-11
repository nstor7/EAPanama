import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main>
    ${portada(datos.contactar)}
    <section class="noHomeSection">
      <article class="mapa">
        <h2>VISITENOS EN:</h2>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.313403012764!2d-79.4634246858236!3d9.03514899351662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8faca9f05e713231%3A0x23f4ae443d84416a!2sEA+Panam%C3%A1+S.A.!5e0!3m2!1ses!2ses!4v1497067862887" width="600" height="450" frameborder="0" style="border:0" allowfullscreen></iframe>
      </article>
      <article class="horarios">
        <h2>Horarios:</h2>
        <p>Lunes a Viernes: de 8:00 am a 4:30 pm <br> Sábados: de 8:00 am a 12:00 pm <br> Llámanos al 390-9933 <br> WhatsApp : 6541-1203</p>
      </article>
    </section>
    <section class="noHomeSection">
      <form action="mensaje" class="formulario">
        <h2>ENVÍANOS UN MENSAJE:</h2>
        <div class="formLine">
          <p>Nombre:</p>
          <input type="text" name="nombre" value="Nombre">
        </div>
        <div class="formLine"><p>Email:</p>
        <input type="email" name="email" value="Email"></div>
        <div class="formLine"><p>Telefono:</p>
        <input type="text" name="telefono" value="Telefono"></div>
        <div class="formLine"><p>Mensaje:</p>
          <textarea name="message" rows="8" cols="80" value="Escriba Un Mensaje"></textarea>
        </div>
        <button class="callToAction">Enviar</button>
      </form>
    </section>
  </main>
`
