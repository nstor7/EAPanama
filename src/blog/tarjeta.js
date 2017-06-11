import yo from 'yo-yo'

module.exports  = function(){
  var el = yo`
    <a class="tarjeta" href="#">
      <div class="tarjetaImagen"></div>
      <div class="tarjetaTexto">
        <h3>Titulo</h3>
        <h5>12 de junio de 2017</h5>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi ad veritatis rerum tenetur dolor tempora et aspernatur officia id. Omnis nisi sint veniam debitis ipsam, incidunt aspernatur quo eaque. Cum.</p>
        <div class="social socialTarjeta">
          <a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
          <a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i>
     </a>
          <a href="#"><i class="fa fa-flickr" aria-hidden="true"></i></a>
        </div>
      </div>
    </a>
  `
  return el
}
