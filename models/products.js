const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type: Number,
        required: true,
    },
    date: { 
        type: Date,
        default: Date.now,
        required: true, 
            },
    version: {
        type: Number,
        required: true,
    },
    category:{
        type:[mongoose.SchemaTypes.ObjectId],
        ref: "Category"
    }
});

module.exports =  mongoose.model("Product", productSchema);

