import yo from 'yo-yo'

var subir = function(){
  window.scrollTo(0,0)
}

module.exports = yo`
  <a href="" id="backTop" class="backTop" onclick=${subir}>
    <i class="fa fa-angle-up" aria-hidden="true"></i>
    <p>top</p>
  </a>
`
