import yo from 'yo-yo'

module.exports = function(){
  var el = yo`
  <div class="social" id="social">
    <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
    <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
    <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
    <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
    <a href="#"><i class="fa fa-flickr" aria-hidden="true"></i></a>
  </div>
  `
  return el 
}
