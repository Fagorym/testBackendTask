const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const categorySchema = new Schema({
    name:{
        type: String,
        required:true
    },
    products:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref:"Product"
    }
 
})



module.exports = mongoose.model("Category", categorySchema);
