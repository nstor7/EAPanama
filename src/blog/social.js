import yo from 'yo-yo'
import fn from './socialFunctions'

module.exports = function(){
  var el = yo`
  <div class="social">
    <div class="fb-share-button" data-href="https://www.sumergidapro.com" data-layout="button" data-size="small" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://sumergidapro.com/blog/EXPOSICIÓN-A-RUIDO-EN-LOS-CARNAVALES">compartir</a></div>
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