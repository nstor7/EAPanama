import yo from 'yo-yo'

var esconderse = function(){
  document.getElementById('imagenChoose').classList.toggle('escondido')
  document.getElementById('imagenCancel').classList.toggle('escondido')
}

var escogerImagen = function(){
  esconderse()
}

var cancelarImagen = function(){
  esconderse()
}

module.exports = yo`
 <div className="editorImagenes">
  <a id="imagenChoose" className="callToAction" onclick=${escogerImagen}>
    <i class="fa fa-camera" aria-hidden="true"></i>
    <input id="imagenUpload" name="imagen" type="file"/>
  </a>
  <a id="imagenCancel" className="callToAction imagenesCancel escondido" onclick=${cancelarImagen}>
    <i class="fa fa-times-circle" aria-hidden="true"></i>
  </a>
 </div>
`