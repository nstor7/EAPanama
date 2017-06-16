import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main>
    ${portada(datos.contactar)}
    <section class="noHomeSection">
      <article class="mapa">
        <h2>VISITENOS EN:</h2>
        <div id="map" class="map"></div>
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
