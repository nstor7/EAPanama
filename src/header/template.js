import yo from 'yo-yo'
import navegacion from './navigationFunction'
import social from '../social'

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
     <li><a href="/productos" onclick=${navegacion}>CACAS y PEDOS</a></li>
     <li><a href="/portafolio" onclick=${navegacion}>PORTFOLIO</a></li>
     <li><a href="/contactar" onclick=${navegacion}>CONTACTAR</a></li>
    </ul>
   </nav>
   ${social()}
  </header>
</div>
`
