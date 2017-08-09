module.exports = function (){
  var viewer = document.getElementById('portafolioViewer')
  viewer.style.background = "url('imagenes/" + this.id + ".jpg')";
  viewer.style.backgroundSize = "contain"
}