import yo from 'yo-yo'
import texto from '../adminEditorTexto'
import imagenes from '../adminEditorImagenes'
import boton from '../adminEditorboton'
import portada from '../cabecera'
import datos from '../cabecera/datos'

module.exports = yo`
<main>
  ${portada(datos.editor)}
  <section class="editor">
    <form id="form" name="formulario">
      <div className="editorTitulo">
        <h2>Título:</h2>
        <input name="titulo" type="text" id="titulo"/>
      </div>
      <div className="editorTitulo">
        <h2>Descripción:</h2>
        <textarea name="descripcion" id="descripcion" cols="30" rows="10"></textarea>
      </div>
      <div className="editorTitulo">
        <h2>Keywords:</h2>
        <input name="keywords" type="text" id="keywords"/>
      </div>
      ${imagenes}
      ${texto}
      ${boton}
    </form>
  </section>
</main>
`