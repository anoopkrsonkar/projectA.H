var mongoose = require('mongoose');


mongoose.Promise = Promise;

var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    
    name: String,
    
    city_id: Number,
    tag:[String],
    category:[String],
    day:[String],
    openingTime: String,
    closingTime: String,
    

    pincode: Number,
    services:[String],

    
    latitude: Number,
    longitude: Number,
    phone_no: Number,
    status: String,
    user_id: Number,
    default_image_file_name: String,
    default_image_content_type: String,
    default_image_file_size: String,
    default_image_updated_at: String,
    address: String,
    city: String,
    areahop_id: Number,
    neighborhood: String,
    state:String,
    website: String,
    business_email: String
});




module.exports = mongoose.model('Collection', CollectionSchema);