import yo from 'yo-yo'
import social from './socialFunctions'

module.exports = function(articulo){
  var el = yo`
  <div class="social" id="social">
    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://sumergidapro.com/blog/${articulo.titulo}"><i class="fa fa-facebook" aria-hidden="true"></i></a>
    <a class="twitter-share-button"
    href="https://twitter.com/intent/tweet?text=Hello%20world">
    Tweet</a>
    <a onclick=${social.compartirFace}><i class="fa fa-facebook" aria-hidden="true"></i></a>
    <a target="_blank" href="https://twitter.com/eapanama"><i class="fa fa-twitter" aria-hidden="true"></i></a>
    <a target="_blank" href="https://plus.google.com/+Eapanama"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
  </div>
  `
  return el
}