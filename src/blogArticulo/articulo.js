import yo from 'yo-yo'

module.exports = function(articulo){
  var el = yo`
  <article>
    <h2>${articulo.titulo}</h2>
    <h5>${articulo.fecha}</h5>
    ${articulo.contenido}
  </article>
  `
  return el
}
