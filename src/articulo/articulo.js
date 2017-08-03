import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import social from '../social'

module.exports = function(articulo){
  console.log(articulo.contenido.valueof)
  var el = yo`
  <div>
    ${portada(articulo)}
    <section class='sectionArticulo'>
      <article class="articuloIzquierda">
        ${social()}
        <h5>${articulo.fecha}</h5>
      </article>
      <article class="articuloContenido" id="articuloContenido">
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
      </article>
    </section>
    <div class="subMenu" id="subMenu"></div>
  </div>
  `
  return el
}
