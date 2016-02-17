var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var requiredStringvalidator = [
    function (val)  {
        var testVal = val.trim();
        return (testVal.length > 0)
    }, 'Field {PATH} cannot be empty'
];


var gameModel = new Schema({
	title: {
		type: String,
		required: true,
		validate: requiredStringvalidator
	},
	developer: {
		type: String,
		required: true,
		validate: requiredStringvalidator
	},
	publisher: {
		type: String,
		required: true,
		validate: requiredStringvalidator
	},
	genre: {
		type: [String],
		required: true
	},
	category: {
		type: String,
		default: 'None'
	},
	played: {
		type: Boolean, 
		default: false
	}
});

module.exports = mongoose.model('Game', gameModel);