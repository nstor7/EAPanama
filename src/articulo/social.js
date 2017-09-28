import yo from 'yo-yo'
import social from './socialFunctions'

module.exports = function(articulo){
  var el = yo`
  <div class="social" id="social">
    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://eapanama.com/blog/${articulo.titulo.replace(/ /g, '-')}"><i class="fa fa-facebook" aria-hidden="true"></i></a>
    <a target="_blank" href="http://twitter.com/home?status=http://eapanama.com/blog/${articulo.titulo.replace(/ /g, '-')}"><i class="fa fa-twitter" aria-hidden="true"></i></a>
    <a href="https://plus.google.com/share?url=https://eapanama.com/blog/${articulo.titulo.replace(/ /g, '-')}" onclick="javascript:window.open(this.href,
    '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><i class="fa fa-google-plus" aria-hidden="true"></i></a>  
  </div>
  `
  return el
}