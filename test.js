// When the app starts
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var Promise = require('bluebird');

var dbConfig = {
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'arias',
    password: 'saira',
    database: 'employees',
    charset: 'utf8'
  }
};

var knex = require('knex')(dbConfig);
var bookshelf = require('bookshelf')(knex);

app.set('bookshelf', bookshelf);

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
};

app.use(allowCrossDomain);
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

// elsewhere, to use the bookshelf client:
var bookshelf = app.get('bookshelf');

// Model Definition ------------------------------
var Friend = bookshelf.Model.extend({
  tableName: 'other_friends',
},
{
  byID: function(id){
    return this.forge().query({where: {friend_id: id}}).fetch();
  }
}
);
// -----------------------------------------------

// First Handler
/*
new Friend().fetchAll().then(function(friends){
  console.log(friends.toJSON());
}).catch(function(error){
  console.log(error);
});
*/
console.log('--------------------');
/*
Friend.byID('7').then(function(friends){
  console.log(friends.toJSON());
}).catch(function(error){
  console.log(error);
});
*/
var newFriend = {
    birth_date: '1912-12-13',
    first_name: 'Anne',
    last_name: 'DEC12',
    gender: 'M',
    phone: '5550013', 
};
Friend.forge(newFriend).save().then(function(friend){
  console.log('Friend Inserted: ', friend.get('friend_id'));
  
});

/*
app.get('/api/:id', function FriendByIdGetHandler(req, res) {
  Friend.byID(req.param.id).then(function(friends){
    res.send(friends.toJSON());
  }).catch(function(error){
    console.log(error);
    res.send(error);
  });
});
*/
