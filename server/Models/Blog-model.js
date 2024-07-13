const mongoose=require('mongooose');

const Schema=mongoose.Schema;

const Blogschema=new Schema({
    Title:{
        type:String,
        minlength:5,
        required
    },
    Content:{
        type:String,
        minlength:50,

        required
    },
    Summary:{
        type:String,
        minlength:10,
        required
    },
    AuthorID:{
        type: Schema.Types.ObjectId,
        ref:'User'

    }
},{
    Timestamp:true
})

module.exports = new mongoose.model('Blog',Blogschema,'blogs');