const Mongoose = require('mongoose');

const MeetModel = new Mongoose.model("meet", {
    m_name:String,
    no:String,
    date:String,
    start:String, 
    end:String

});

module.exports = MeetModel;