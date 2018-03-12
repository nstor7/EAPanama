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
        <h2>ABRIR CON:</h2>
        <div class="mapLinks">
          <a href="waze://?ll=9.0354163,-79.4638468" target="_blank"><div className="wazeImg"></div></a>
          <a href="http://goo.gl/maps/PJomt4sbS4M2" target="_blank"><div className="gmapsImg"></div></a>
        </div>
        <h2>HORARIOS:</h2>
        <p><i class="fa fa-clock-o" aria-hidden="true"></i> Atención al Cliente <br> Lunes a Viernes: de 9:00 am a 4:00 pm <br>    Sábados: de 8:00 am a 12:00 pm <br>
<i class="fa fa-phone" aria-hidden="true"></i> Llámanos al 390-9933 <br> <i class="fa fa-whatsapp" aria-hidden="true"></i> WhatsApp : 6144-2899</p>
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
        <input type="submit" value="Enviar" class="callToAction formButton">
      </form>
    </section>
  </main>
`
