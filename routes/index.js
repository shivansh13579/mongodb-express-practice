var express = require('express');
var router = express.Router();

const userModel = require("./users");

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get("/create",async function(req,res){
let userdata = await userModel.create({
    username: 'harshi',
  nickname: "harshiiiiiiii",
  description: "hello everyone",
  categories: ['fashion','life','science']
  });
  res.send(userdata);
});
//How can i perform a case-insensitive search in Mongoose;
router.get("/find",async function(req,res){
  var regex = new RegExp("^Harsh","i");
 let user = await userModel.find({username: regex});
 res.send(user);
});

//How do I find document where an array field contains all of a set of value?
router.get("/find2",async function(req,res){
  let user = await userModel.find({categories: {$all: ["fashion","science"]}});
  res.send(user);
});

//How can I Search for documents with a specific date range in Mongoose?
router.get("/find3",async function(req,res){
  var date1 = new Date('2023-10-02');
  var date2 = new Date("2023-11-06");
  let user = await userModel.find({datecreated: {$gte : date1,$lte: date2}});
  res.send(user);
})

//How can I filter documents based on the existence of a field in Mongoose?
router.get("/find4",async function(req,res){
  let user = await userModel.find({categories: {$exists: true}});
  res.send(user);
})

//How can I filter documents based on a specific field's length in Mongoose?
router.get("/find5",async function(req,res){
  let user = await userModel.find({
    $expr: {
      $and: [
        {$gte: [{$strLenCP: "$nickname"},0]},
        {$lte: [{$strLenCP: "$nickname"},20]}
      ]
    }
  })
  res.send(user);
})

module.exports = router;
