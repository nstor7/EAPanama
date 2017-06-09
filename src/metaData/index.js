import empty from 'empty-element'

module.exports = function(title, description, keywords){
  var metaTitle = document.getElementById('metaTitle')
  var  metaDescription = document.getElementById('metaDescription')
  var  metaKeywords = document.getElementById('metaKeywords')
  empty(metaTitle)
  metaTitle.innerHTML = title
  metaDescription.content = description;
  metaKeywords.content = keywords;
}
