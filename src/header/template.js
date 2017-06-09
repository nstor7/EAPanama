import yo from 'yo-yo'
import navegacion from './navigationFunction'

module.exports = yo`
<div class="headerContainer" id="cabeza">
  <header id="headerTag" class="feo">
   <a href="#" class="navButton" onclick=${navegacion}>
      <i class="fa fa-bars" aria-hidden="true"></i>
    </a>
   <a href="/">
     <div id="logo" class="logo"></div>
   </a>
   <nav id="nav" class="nav hidden">
    <ul>
     <li><a href="/" id="navHome" onclick=${navegacion}>HOME</a></li>
     <li><a href="/about" onclick=${navegacion}>ABOUT</a></li>
     <li><a href="/blog" onclick=${navegacion}>BLOG</a></li>
     <li><a href="/servicio" onclick=${navegacion}>SERVICIOS</a></li>
     <li><a href="/productos" onclick=${navegacion}>PRODUCTOS</a></li>
     <li><a href="/portafolio" onclick=${navegacion}>PORTAFOLIO</a></li>
     <li><a href="/contactar" onclick=${navegacion}>CONTACTAR</a></li>
    </ul>
   </nav>
   <div class="social" id="social">
     <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
     <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
     <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
     <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i>
</a>
     <a href="#"><i class="fa fa-flickr" aria-hidden="true"></i></a>
   </div>
  </header>
</div>
`
