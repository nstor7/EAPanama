import request from 'superagent'

module.exports = function(ctx, next){
  request
    .get('https://maps.googleapis.com/maps/api/js?key=AIzaSyDMAreQT9pdjdYL-mCkj7ixSjdu3oaAxlg')
    .end(function(err, res){
      if(err) return console.log(err)

      console.log('conectado a google.Maps')
      next()
  })
}
