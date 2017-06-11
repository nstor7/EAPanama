module.exports = function(){
    var headerContainer = document.getElementById('cabeza')
    var backTop = document.getElementById('backTop')
  if(window.scrollY > 70){
    headerContainer.classList.add('blanco')
    backTop.classList.add('visible')
  }if(window.scrollY < 70){
    headerContainer.classList.remove('blanco')
    backTop.classList.remove('visible')
  }
}
