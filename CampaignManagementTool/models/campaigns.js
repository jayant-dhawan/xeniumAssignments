var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('campaigns', new Schema({
    "advertiserId": String,
    "advertiserName": String,
    "campaignName": String,
    "descriptionMode": String,
    "campaignPay": String,
    "landingPoint": String,
    "geo": String,
    "vertical": String
}));