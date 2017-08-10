import yo from 'yo-yo'

module.exports = function(articulos){
  var el = yo`
  <footer>
    <article class="footerCuerpo">
      <div>
        <div class="footerLogo"></div>
        <div class="footerContacto">
          <div class="telefono">
            <i class="fa fa-phone" aria-hidden="true"></i>
            <span>+507 390-9933</span>
          </div>
          <a class="mail" href="mailto:info@eapanama.com">
            <i class="fa fa-envelope" aria-hidden="true"></i>
            <span>info@eapanama.com</span>
          </a>
        </div>
      </div>
      <div>
        <h3>ACCESO RÁPIDO</h3>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/portafolio">Portfolio & Upcoming Work</a></li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/contactar">Contactar</a></li>
        </ul>
      </div>
      <div>
        <h3>PRODUCTOS POPULARES</h3>
        <ul>
          <li><a href="/pdf/MGB.pdf">MGB Board</a></li>
          <li><a href="/pdf/Rubber3M.pdf">Rubber Acústico</a></li>
          <li><a href="pdf/rockwool.pdf">Lana de Roca</a></li>
          <li><a href="/pdf/CFAB.pdf">CFAB Panel de Celulosa</a></li>
        </ul>
      </div>
      <div>
        <h3>ÚLTIMAS ENTRADAS</h3>
        <ul>
          <li>
            <a href="/blog/${articulos[articulos.length - 1].titulo.replace(/ /g, '-')}">${articulos[articulos.length - 1].titulo}</a>
          </li>
        </ul>
      </div>
    </article>
    <article class="footerPie">
      <p class="creditos">
        2017 EA Panamá S.A.- Galera TecnoPro, Llano Bonito, Juan Díaz ,Panamá
      </p>
      <div class="footerMenu"></div>
    </article>
  </footer>
`
return el
}
