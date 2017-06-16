import yo from 'yo-yo'

module.exports = yo`
<div class="portada">
  <div id="video-container">
    <video autoplay loop id="bgvid">
      <source src="imagenes/web-home-video.webm" type="video/webm">
      <source src="imagenes/web-home-video.mp4" type="video/mp4">
      <source src="images-web/web-home-video.ogv" type="video/ogg">
    </video>
  </div>
  <div class="indexPortada">
    <h1>EA Panamá S.A.</h1>
    <h2>Noise controlling & Acoustics Designs</h2>
    <p> ¿ Necesitas ayuda en acondicionamiento acústico o aislamiento acústico ? <br>Consulta con los profesionales del sector</p>
    <a href="/contactar" class="callToAction">Contactar</a>
  </div>
</div>
`
