module.exports = function(){
    var cabeza = document.getElementById('cabeza')
    var header = document.getElementById('headerTag')
    var nav = document.getElementById('nav')
    var social = document.getElementById('social')
    var logo = document.getElementById('logo')
    var backTop = document.getElementById('backTop')
  if(window.scrollY > 70){
    cabeza.classList.add('blanco')
    header.classList.add('blancoHeader')
    nav.classList.add('blancoNav')
    social.classList.add('blancoSocial')
    logo.classList.add('blancoLogo')
    backTop.classList.add('visible')
  }if(window.scrollY < 70){
    cabeza.classList.remove('blanco')
    header.classList.remove('blancoHeader')
    nav.classList.remove('blancoNav')
    social.classList.remove('blancoSocial')
    logo.classList.remove('blancoLogo')
    backTop.classList.remove('visible')
  }
}
