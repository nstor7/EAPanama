import yo from 'yo-yo'

module.exports = function(datos){
  var el =  yo`
    <section class="demasPortada">
      <hgroup>
        <h2>${datos.titulo}</h2>
        <p>${datos.subtitulo}</p>
      </hgroup>
      <div class="demasPortadaImagen" style="background: url(imagenes/${datos.imagen})"></div>
    </section>
  `
  return el
}
