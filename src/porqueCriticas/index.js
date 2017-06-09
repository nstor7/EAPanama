import yo from 'yo-yo'

module.exports = function(critica){
  var el = yo`
    <div class="critica">
      <p>${critica.mensaje}</p>
      <div class="criticaAutor">
        <div class="criticaAutorAvatar"></div>
        <hgroup>
          <h4>${critica.autor}</h2>
          <h5>${critica.titulo}</h4>
        </hgroup>

      </div>
    </div>
  `
  return el
}
