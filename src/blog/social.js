import yo from 'yo-yo'
import fn from './socialFunctions'

module.exports = function(articulo){
  var el = yo`
  <div class="social">
    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://eapanama.com/blog/${articulo.titulo}"><i class="fa fa-facebook" aria-hidden="true"></i></a>
    <a target="_blank" href="https://twitter.com/eapanama"><i class="fa fa-twitter" aria-hidden="true"></i></a>
    <a class="twitter-share-button"
    href="https://twitter.com/intent/tweet?text=Hello%20world">
    Tweet</a>
    <a target="_blank" href="https://plus.google.com/+Eapanama"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
    <a target="_blank" href="https://www.linkedin.com/company-beta/3824317/"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
    <a target="_blank" href="https://www.instagram.com/ea_panama/"><i class="fa fa-instagram" aria-hidden="true"></i></a>
  </div>
  `
  return el
}