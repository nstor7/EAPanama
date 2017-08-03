import yo from 'yo-yo'
import text from './textFunction'

module.exports = yo`
  <article className="textEditor">
    <div id="editorMenu" class="editorMenu">
      <a onclick=${text} id="subtitle" class="callToAction">Abri editor</a>
    </div>
    <div id="editorArea" className="editorArea"></div>
  </article>
`