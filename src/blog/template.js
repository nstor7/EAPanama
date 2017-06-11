import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import tarjeta from './tarjeta'

module.exports = function(tarjetas){
  var el = yo`
    <main>
      ${portada(datos.blog)}
      <section class="blogSection">
        ${tarjetas.map(function(){
          return tarjeta()
        })}
      </section>
    </main>
  `
  return el
}
