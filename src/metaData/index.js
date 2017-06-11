import empty from 'empty-element'

module.exports = function(title, description, keywords){
  var metaTitle = document.getElementById('metaTitle')
  var  metaDescription = document.getElementById('metaDescription')
  var  metaKeywords = document.getElementById('metaKeywords')
  empty(metaTitle).innerHTML = title
  empty(metaDescription).content = description;
  empty(metaKeywords).content = keywords;
}
