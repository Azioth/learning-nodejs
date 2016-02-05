var express = require('express');
var router = express.Router();
var Game = require('../models/gameModel.js');
var games = require('./gameRoutes.js')(Game);
//var library = require('./games.js');


/*
* Routes for games
*/
router.get('/api/v1/games', games.getAll);
router.get('/api/v1/games/:gameId', games.getOne);
router.post('/api/v1/games/', games.create);
router.put('/api/v1/games/:gameId', games.update);
router.patch('/api/v1/games/:gameId', games.patch);
router.delete('/api/v1/games/:gameId', games.del);
///*
//* Routes that can be accessed only by authenticated & authorized users
//*/
//router.get('/api/v1/library', library.getAll);
//router.get('/api/v1/library/:categoryName', library.getOne);
//router.post('/api/v1/library/', library.create);
//router.put('/api/v1/library/:categoryName', library.update);
//router.patch('/api/v1/library/:categoryName', library.patch);
//router.delete('/api/v1/library/:categoryName', library.delete);
module.exports = router;