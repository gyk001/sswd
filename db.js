var mongoose = require( 'mongoose' );
var settings = require('./settings.json');
 
var url = 'mongodb://'+settings.db.host+'/'+settings.db.db 
mongoose.connect( url );

exports.db = mongoose;
