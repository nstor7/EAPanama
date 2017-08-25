import empty from 'empty-element'

module.exports = function(ctx, next){
 var footer = document.getElementById('footer')
 empty(footer)
 next()
}