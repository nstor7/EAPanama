module.exports = function(){
  var librariesMiniaturas = document.getElementsByClassName('tabEspacio')
  var i
  for(i = 0; i < librariesMiniaturas.length; i++){
      librariesMiniaturas[i].classList.remove('active')
      librariesMiniaturas[i].previousElementSibling.firstElementChild.classList.add('fa-folder')
      librariesMiniaturas[i].previousElementSibling.firstElementChild.classList.remove('fa-folder-open')
    }
  this.focus()
  this.nextElementSibling.classList.add('active')
  this.firstElementChild.classList.remove('fa-folder')
  this.firstElementChild.classList.add('fa-folder-open')
}
