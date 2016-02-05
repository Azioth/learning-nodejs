var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var requiredStringvalidator = [
    function (val)  {
        var testVal = val.trim();
        return (testVal.length > 0)
    }, '{PATH} cannot be empty'
];


var gameModel = new Schema({
	title: {
		type: String,
		validate: requiredStringvalidator
	},
	developer: {
		type: String,
		validate: requiredStringvalidator
	},
	genre: {
		type: String,
		validate: requiredStringvalidator
	},
	played: {
		type: Boolean, 
		default: false
	}
});

module.exports = mongoose.model('Game', gameModel);