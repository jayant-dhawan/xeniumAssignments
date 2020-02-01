var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('advertisers', new Schema({
    "adName": String,
    "adContact": String,
    "adEmail": String,
    "adCompany": String
}));