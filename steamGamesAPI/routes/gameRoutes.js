var mongoose = require('mongoose');

var games = function (Game) {

	var getAll = function(req, res) {
		var query = {};
    
        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        if (req.query.played) {
        	query.played = req.query.played
        }
        Game.find(query, function (err, games) {
            if (err)
                res.status(500).send(err);
            else
                var returnGames = [];
                games.forEach(function(element, index, array){
                    var newGame = element.toJSON();
                    newGame.links= {};
                    delete newGame.__v;
                    newGame.links.self = 'http://' + req.headers.host + '/api/v1/games/' + newGame._id
                    returnGames.push(newGame);
                });
                res.json(returnGames);
		})
	}

	var getOne = function (req, res) {
		if (mongoose.Types.ObjectId.isValid(req.params.gameId)){
			Game.findById(req.params.gameId, function (err, game){
			if(err)
				res.status(500).send(err)
			else if (game) {
				var newGame = game.toJSON();
				delete newGame.__v;
				res.json(newGame);
			}
			else
				res.status(404).json({ "errorMessage": "No game found with id '" + req.params.gameId + "'." });
			})
		} else
			res.status(404).json({ "errorMessage": "Invalid format id."});
		
	}

	var create = function (req, res) {
		var game = new Game(req.body);
		game.save(function (err){
			if (err) {
				var returnJson = {};
				returnJson.errorMessage = [];
				for  (var error in err.errors) {
					returnJson.errorMessage.push({validationError: err.errors[error].message})
				}
				res.status(400).json(returnJson)
			} else
				res.status(201).set('Content-Location', 'http://' + req.headers.host + '/api/v1/games/' + game._id).send();

		});
		//res.status(201).send(game);
	}

	var update = function (req, res) {
		Game.findById(req.params.gameId, function(err, game){
			if(err)
				res.status(500).send(err)
			else if (game){
				game.title = req.body.title
				game.genre = req.body.genre
				game.developer = req.body.developer
				game.played = req.body.played
				game.save(function(err, game){
					if (err) {
						var returnJson = {};
						for  (var error in err.errors) {
							returnJson = {errorMessage: err.errors[error].message}
						}
						res.status(400).json(returnJson)
					}
					else
						res.status(204).send();
					})
			}
			else
				res.status(404).json({ "errorMessage": "No game found with id '" + req.params.gameId + "'." });
		})
	}

	var patch = function (req, res) {
		Game.findById(req.params.gameId, function(err, game){
			if(err)
				res.status(500).send(err)
			else if (game){
				if (req.body._id) {
            		delete req.body._id;
        		}
        		for (var p in req.body) {
            		game[p] = req.body[p];
        		}
       			game.save(function (err) {
           			if (err) {
						var returnJson = {};
						for  (var error in err.errors) {
							returnJson = {errorMessage: err.errors[error].message}
						}
						res.status(400).json(returnJson)
					}
					else
						res.status(204).send();
				})
			}
			else
				res.status(404).json({ "errorMessage": "No game found with id '" + req.params.gameId + "'." });
    	})
	}

	var del = function (req, res) {
		Game.findById(req.params.gameId, function(err, game){
			if(err)
				res.status(500).send(err)
			else if (game){
				game.remove(function (err) {
		            if (err) {
						var returnJson = {};
						for  (var error in err.errors) {
							returnJson = {errorMessage: err.errors[error].message}
						}
						res.status(400).json(returnJson)
					}
					else
						res.status(204).send();
		        })
			}
		})
	}

	return{
		getAll,
		getOne,
		create,
		update,
		patch,
		del
	}
		

};
module.exports = games;

// var express = require('express');


// var routes = function(Game){
// 	var gameRouter = express.Router();
   
// 	gameRouter.route('/')
// 		.post(function (req, res){
// 			var game = new Game(req.body);


// 			game.save();
// 			res.status(201).send(game);
			
// 		})
// 		.get(function (req, res){

// 			var query = {};
        
// 	        if (req.query.genre) {
// 	            query.genre = req.query.genre;
// 	        }
// 	        if (req.query.played) {
// 	        	query.played = req.query.played
// 	        }
// 	        Game.find(query, function (err, games) {
// 	            if (err)
// 	                res.status(500).send(err);
// 	            else
// 	                res.json(games);
// 			})
// 		});
// 	gameRouter.route('/:gameId')
// 		.get(function (req, res){
// 			Game.findById(req.params.gameId, function(err, game){
// 				if(err)
// 					res.status(500).send(err)
// 				else if (game)
// 					res.json(game)
// 				else
// 					res.status(404).json({ "error": "No game found with id: '" + req.params.gameId + "'" });
// 			})
// 		})
// 		.put(function (req, res){
// 			Game.findById(req.params.gameId, function(err, game){
// 				if(err)
// 					res.status(500).send(err)
// 				else if (game){
// 					game.title = req.body.title
// 					game.genre = req.body.genre
// 					game.developer = req.body.developer
// 					game.played = req.body.played
// 					game.save(function(err, game){
// 						if(err)
// 							res.status(500).send(err)
// 						else
// 							res.json(game)
// 					})
// 				}
// 				else
// 					res.status(404).json({ "error": "No game found with id: '" + req.params.gameId + "'" });
// 			})
			
// 		})
// 		.patch(function (req, res){
// 			Game.findById(req.params.gameId, function(err, game){
// 				if(err)
// 					res.status(500).send(err)
// 				else if (game){
// 					if (req.body._id) {
// 	            		delete req.body._id;
// 	        		}
// 	        		for (var p in req.body) {
// 	            		game[p] = req.body[p];
// 	        		}
// 	       			game.save(function (err) {
// 	           			if (err)
// 	                		res.status(500).send(err);
// 	           			else
// 	                		res.json(game);
// 					})
// 				}
// 				else
// 					res.status(404).json({ "error": "No game found with id: '" + req.params.gameId + "'" });
// 	    	});
// 		});
// 	return gameRouter;
// };
