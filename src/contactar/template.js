import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main>
    ${portada(datos.contactar)}
    <section class="noHomeSection">
      <article class="mapa">
        <div id="map_canvas" style="width:100%; height:100%">
        </div>
      </article>
    </section>
    <section class="noHomeSection arriba">
      <article class="horarios">
        <h2>HORARIOS:</h2>
        <p>Lunes a Viernes: de 8:00 am a 4:30 pm <br> Sábados: de 8:00 am a 12:00 pm <br> Llámanos al 390-9933 <br> WhatsApp : 6541-1203</p>
      </article>
      <form method="post" action="contactar/send" class="formulario">
        <h2>ENVÍANOS UN MENSAJE:</h2>
        <div class="formLine">
          <p>Nombre:</p>
          <input type="text" name="nombre" value="Nombre">
        </div>
        <div class="formLine"><p>Email:</p>
        <input id="email" type="email" name="email" value="Email"></div>
        <div class="formLine"><p>Telefono:</p>
        <input type="text" name="telefono" value="Telefono"></div>
        <div class="formLine"><p>Mensaje:</p>
          <textarea name="message" rows="8" cols="80" value="Escriba Un Mensaje"></textarea>
        </div>
        <input type="submit" value="Enviar" class="callToAction">
      </form>
    </section>
  </main>
`
