import yo from 'yo-yo'

module.exports = function(elemento){
  var el = yo`
    <a class="miniatura" style="background: url('${elemento.miniatura}'); background-size: cover;"></a>
  `
  return el
}
