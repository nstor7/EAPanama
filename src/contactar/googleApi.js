import yo from 'yo-yo'

module.exports = function(){
  var container = document.getElementById('body')
  var script1 = yo`<script type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyDMAreQT9pdjdYL-mCkj7ixSjdu3oaAxlg'></script>`
  var script2 = yo`<script type='application/javascript' src='mapa.js'>initialize()</script>`
  container.appendChild(script1)
  container.appendChild(script2)
}
