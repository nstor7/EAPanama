import yo from 'yo-yo'
import portada from '../cabecera'
import datos from '../cabecera/datos'
import ctrl from './autenticar'

module.exports = yo`
<main>
 ${portada(datos.admin)}
 <section className="noHomeSection confirmacion">
  <form class="formulario">
   <h2>PERMITENOS DARTE ACCESO A LA CONSOLA DE ADMINISTRACION</h2>
   <div id="noAuth">
   </div>
   <div class="formLine">
     <p>Nombre:</p>
     <input type="text" name="username" id="nombre">
   </div>
   <div class="formLine"><p>Contraseña:</p>
    <input type="password" name="password" id="password">
   </div>
   <a class="callToAction" onclick=${ctrl.autenticar}>Autenticar</a>
  </form>
 </section>
</main>
`
