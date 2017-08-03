import request from 'superagent'


var borrar = function(){
 var articuloId = this.getAttribute('data-id').toString()
 request
  .delete(`../api/articulo/${articuloId}`)
  .end(function(err, res){
      if(err) console.log('hubo un error')
        
      window.location.href = '/admin/lista'
    })
 
}

var editar = function (ev){
  ev.preventDefault()

  var c = document.querySelector('#editorArea').childNodes
  var i
  var contenido = []
  
  for(i = 0; i < c.length; i++){
    if(c[i].nodeName === 'H2'){
      contenido.push({
        name: c[i].nodeName,
        content: c[i].innerText
      })
    } if(c[i].nodeName === 'P'){
      let content = []
      contenido.push({
        name: c[i].nodeName,
        content: content
      })
      var a
      for(a = 0; a < c[i].childNodes.length; a++){
        if(c[i].childNodes[a].nodeName === '#text'){
          content.push({
          type: c[i].childNodes[a].nodeName,
          text: c[i].childNodes[a].nodeValue
        })
        }else{
          content.push({
          type: c[i].childNodes[a].nodeName,
          text: c[i].childNodes[a].innerText
        })
        }
        
      }
    } if(c[i].nodeName === 'UL'){
      let content = []
      contenido.push({
        name: c[i].nodeName,
        content: content
      })
      var a
      for(a = 0; a < c[i].childNodes.length; a++){
        content.push(c[i].childNodes[a].innerText)
      }
    }
  }
  var form = document.getElementById('form')
  var data = new FormData(form)
  var contenidoJson = JSON.stringify(contenido);
  data.append('contenido', contenidoJson)
 
var articuloId = this.getAttribute('data-id').toString()
console.log(articuloId)
request
    .put(`../../api/articulo/${articuloId}`)
    .send(data)
    .end(function(err, res){
      if(err) console.log(err)
        
      window.location.href = '/admin/lista'
    })
}

module.exports = {borrar, editar}