import yo from 'yo-yo'
import onSubmit from './onSubmitFunction'

module.exports = yo`
  <div className="editorboton">
    <input className="callToAction" type="submit" value="Subir" onclick=${onSubmit}>
  </div>
`