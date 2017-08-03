const express = require('express')
const blog = express.Router()

blog.use(express.static('public'))

blog.get('/', function(req, res){
 res.render('index.pug')
})
blog.get('/:titulo', function(req, res){
 res.render('index.pug')
})

module.exports = blog