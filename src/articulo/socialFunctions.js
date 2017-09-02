function compartirFace(){
 FB.ui({
  method: 'share',
  href: 'https://developers.facebook.com/docs/',
 }, function(response){});
}

module.exports = {compartirFace}