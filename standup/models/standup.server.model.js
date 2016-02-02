var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var memberNameValidator = [
    function (val) {
        return (val.length > 0 && val.toLocaleLowerCase() != 'none')
    }, 'Select a valid member name.'
];
   
var requiredStringvalidator = [
    function (val)  {
        var testVal = val.trim();
        return (testVal.length > 0)
    }, '{PATH} cannot be empty'
];

var standupSchema = new Schema({
	memberName: {
        type: String,
        required: true,
        validate: memberNameValidator},
	project: {
        type: String,
        required: true,
        validate: requiredStringvalidator},
	workYesterday: {
        type: String,
        required: true,
        validate: requiredStringvalidator},
	workToday: {
        type: String,
        required: true,
        validate: requiredStringvalidator},
	impediment: {
        type: String,
        required: true,
        default: 'none'},
	createdOn: { type: Date, default: Date.now }
});

//Export model
module.exports = mongoose.model('Standup', standupSchema);
