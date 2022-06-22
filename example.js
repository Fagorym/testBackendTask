const Product = require("./models/products");
const Category = require("./models/categories")
const express = require('express');
const mongoose = require("mongoose");
const url = require('url');
const http = require('http');
const qs = require('querystring');
const PORT = 3000
const db = 'mongodb+srv://Fagor:testing123@cluster0.lvmls.mongodb.net/myDb?retryWrites=true&w=majority'
mongoose
    .connect(db)
    .then((res) => console.log("Connected to db"))
    .catch((error) => console.log(error));

app = express();

async function getProductById (res,id){
    try{
        let prod = await Product.findById(id);
        let jsonProd = JSON.stringify(prod);
        res.end(jsonProd);
    }
    catch(e)
    {
        console.log(e.message)
        res.end("No such a product")

    }
}

async function getCategoryAvgPrice (res,cat){
    try{
        let category = await Category.findById("62b2bda019598dd20a41bd7a");
        sum = 0
       for (let index = 0; index < category.products.length; index++) {
        curProd = await Product.findById(category.products[index]);
        sum += curProd.price;
       }
       let avgPrice = sum/category.products.length;
       res.end(JSON.stringify({avg: avgPrice}));
    }
    catch(e)
    {
        console.log(e.message)
        res.end("No such a category");

    }
}


async function getProductByName (res,name){
    try{
        let prod = await Product.where('name').equals(name).sort({'version': -1}).limit(1);
        let jsonProd = JSON.stringify(prod);
        res.end(jsonProd);
    }
    catch(e)
    {
        console.log(e.message)
        res.end("No such a product")

    }
}



http.createServer((req,res) => {
    if (req.method == "GET"){
        let urlRequest = url.parse(req.url,true); 
        if (urlRequest.query.type == 'getProductById'){
            let id = urlRequest.query.id;
            getProductById(res,id);
        }
        else if (urlRequest.query.type == 'getCategoryAvgPrice'){
            let cat = urlRequest.query.category;
            getCategoryAvgPrice(res,cat);
        }
    }
    else  if (req.method == "POST") {
        let body = '';
        req.on('data',chunk => {
            body += chunk.toString(); 
        });
        req.on('end', () => {
            let params = qs.parse(body);
            getProductByName(res,params.name);
        })
    };
}).listen(PORT);
