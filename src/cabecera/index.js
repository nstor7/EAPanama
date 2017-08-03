import yo from 'yo-yo'

module.exports = function(datos){
  var el =  yo`
    <section class="demasPortada">
      <div class="demasPortadaFondo">
        <div>
          <h2>${datos.titulo}</h2>
          <p>${datos.subtitulo}</p>
        </div>
      </div>
      <div class="demasPortadaImagen" style="background: url('${datos.imagen}'); background-size: cover"></div>
    </section>
  `
  return el
}
