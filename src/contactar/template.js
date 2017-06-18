import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
  <main>
    ${portada(datos.contactar)}
    <section class="noHomeSection">
      <article class="mapa">
        <div id="map_canvas" style="width:100%; height:100%">
          <iframe src="https://www.google.com/maps/place/EA+Panam%C3%A1+S.A./@9.035149,-79.4634247,17z/data=!4m12!1m6!3m5!1s0x8faca9f05e713231:0x23f4ae443d84416a!2sEA+Panam%C3%A1+S.A.!8m2!3d9.035149!4d-79.461236!3m4!1s0x8faca9f05e713231:0x23f4ae443d84416a!8m2!3d9.035149!4d-79.461236" frameborder="0"></iframe>
        </div>
      </article>
    </section>
    <section class="noHomeSection arriba">
      <article class="horarios">
        <h2>Horarios:</h2>
        <p>Lunes a Viernes: de 8:00 am a 4:30 pm <br> Sábados: de 8:00 am a 12:00 pm <br> Llámanos al 390-9933 <br> WhatsApp : 6541-1203</p>
      </article>
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
