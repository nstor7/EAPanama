import yo from 'yo-yo'
import text from '../adminEditorTexto/textFunction'
import tarjeta from '../articulo/articulo'
import onSubmit from '../adminEditorBoton/onSubmitFunction'
import fn from '../adminLista/listaFunctions'


module.exports = function(articulo){
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

 var el = yo`
  <section class="editor">
    <form id="form" name="formulario" enctype="multipart/form-data">
      <div className="editorTitulo">
        <h2>Título:</h2>
        <input name="titulo" type="text" id="titulo" value="${articulo.titulo}"/>
      </div>
      <div className="editorTitulo">
        <h2>Descripción:</h2>
        <textarea name="descripcion" id="descripcion" cols="30" rows="10">${articulo.descripcion}</textarea>
      </div>
      <div className="editorTitulo">
        <h2>Keywords:</h2>
        <input name="keywords" type="text" id="keywords" value="${articulo.keywords}"/>
      </div>
      <div className="editorImagenes">
        <a id="imagenChoose" className="callToAction" onclick=${escogerImagen}>
          <i class="fa fa-camera" aria-hidden="true"></i>
          <input defaultValue="${articulo.imagen}" id="imagenUpload" name="imagen" type="file"/>
        </a>
        <a id="imagenCancel" className="callToAction imagenesCancel escondido" onclick=${cancelarImagen}>
          <i class="fa fa-times-circle" aria-hidden="true"></i>
        </a>
      </div>
      <article className="textEditor">
        <div id="editorMenu" class="editorMenu">
          <a onclick=${text} id="subtitle" class="callToAction">Abri editor</a>
        </div>
        <div id="editorArea" className="editorArea">
         ${articulo.contenido.map(function(tag){
          if(tag.name === 'H2'){
            return yo`<h2>${tag.content}</h2>`
          } if(tag.name === 'P'){
            return yo`<p>
              ${tag.content.map(function(item){
              if(item.type === '#text'){
                return yo`${item.text}`
              }
              if(item.type === 'B'){
                return yo`<b>${item.text}</b>`
              } if(item.type === 'I'){
                return yo`<i>${item.text}</i>`
              } if(item.type === 'U'){
                return yo`<u>${item.text}</u>`
              }
            })}
            </p>` 
          } if(tag.name = 'UL'){
            return yo`<ul>
              ${tag.content.map(function(item){
                return yo`<li>${item}</li>`
              })}
            </ul>`
          }
        })}
        </div>
      </article>
      <div className="editorboton">
        <input className="callToAction" type="submit" value="Subir" onclick=${fn.editar} data-id="${articulo._id}">
      </div>
    </form>
  </section>
`

return el
}
