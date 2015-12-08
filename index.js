var express = require('express');
var app = express();
var bodyParse = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var Hashids = require('hashids'),
        hashids = new Hashids("resistance is futile", 6, 'usUSncNC0123456789');
var db = require('./models');

app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(bodyParse.urlencoded({extended:false} ) );
app.use(express.static(__dirname + '/static') );

app.get('/', function(req,res){
    res.render('index');
});

app.get('/link', function(req, res){
  db.url.findAll({limit: 10, order: [['count', 'DESC'] ] } ).then(function(link){
    //Mahalo to Loraine Kanervisto for pairing with me to get the encoded hash with my links.//
    var numberArr = [];
    for (var i = 0; i < link.length; i ++){
      var id = link[i].id;
      var number = hashids.encode(id);
      numberArr.push(number);
  }
    res.render('link', {link: link, number: numberArr});
  });
});

app.post('/link', function(req, res){
  fullURL = req.body.url;
  var newURL = {
    full_url: fullURL
  };
  db.url.create(newURL).then(function(url){
    db.url.find({where: {full_url: fullURL}, attributes: ['id'] } ).then(function(url){
      var number = hashids.encode(url.id);
      var redirect = '/link/' + number;
      res.redirect(redirect);
    });
  });
});

app.get('/link/:id', function(req, res){
  var key = req.params.id;
  var number = hashids.decode(key);
  db.url.find({where: {id: number}, attributes: ['full_url'] } ).then(function(id){
    res.render('show', {key: key, id: id});
  });
});

app.get('/:hash', function(req, res){
  var key = req.params.hash;
  var number = hashids.decode(key);

    db.url.find({where: {id: number} } ).then(function(count){
      count.increment(['count'], {by:1});
      res.redirect(count.full_url);

  });
});

// app.listen(3000);
app.listen(process.env.PORT || 3000);
