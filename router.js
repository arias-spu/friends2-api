var express = require('express');       // imports the express library
var router = express.Router();          // Router object for routes


//var bodyParser = require('body-parser');
//var Promise = require('bluebird');

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

router.GetBookshelf = function GetBookshelfHandler(){
    return bookshelf;
};


// Model Definition ------------------------------
var Friend = bookshelf.Model.extend(
  {
    tableName: 'other_friends'
  },
  {
    byID: function(id){
      return this.forge().query({where: {friend_id: id}}).fetch();
    }
  }
);

// -----------------------------------------------




router.get('/friends', function FriendsGetHandler(request, response) {
	new Friend().fetchAll()
		.then(function(friends) {
			response.send(friends.toJSON());
		}).catch(function(error) {
			console.log(error);
			response.send('An error occured');
		});
});

router.get('/:id', function FriendByIdGetHandler(request, response) {
	Friend.byID(request.params.id).then(function(friends){
		response.send(friends.toJSON());
	}).catch(function(error){
		console.log(error);
		response.send(error);
	});
});

router.post('/friends', 
    function FriendsPostHandler(request, response){
        var newFriend = {
            birth_date: request.body.birthDate,
            first_name: request.body.firstName,
            last_name: request.body.lastName,
            gender: request.body.gender,
            phone: request.body.phone, 
        };
        Friend.forge(newFriend).save().then(function(friend){
          console.log('Friend Inserted: ', friend.get('first_name'));
          response.send(friend.toJSON());
        });
});

module.exports = router;