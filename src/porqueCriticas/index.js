import yo from 'yo-yo'

module.exports = function(critica){
  var el = yo`
    <div class="critica">
      <p>${critica.mensaje}</p>
    </div>
  `
  return el
}
