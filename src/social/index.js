import yo from 'yo-yo'

module.exports = function(){
  var el = yo`
  <div class="social" id="social">
    <a target="_blank" href="https://www.facebook.com/EngineeringAcousticsPanama?ref=bookmarks"><i class="fa fa-facebook" aria-hidden="true"></i></a>
    <a target="_blank" href="https://twitter.com/eapanama"><i class="fa fa-twitter" aria-hidden="true"></i></a>
    <a target="_blank" href="https://plus.google.com/+Eapanama"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
    <a target="_blank" href="https://www.linkedin.com/company-beta/3824317/"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
    <a target="_blank" href="https://www.instagram.com/ea_panama/"><i class="fa fa-instagram" aria-hidden="true"></i></a>
  </div>
  `
  return el
}
