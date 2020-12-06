const express = require("express");
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser =require("body-parser");
const { userInfo } = require("os");
const { nextTick } = require("process");

app.use(express.static('/public'));
app.use('/css', express.static('css'));
app.use('/fontawesome-free-5.12.1-web', express.static('fontawesome-free-5.12.1-web'));
app.use('/js', express.static('js'));
app.use('/images', express.static('images'));
app.use(bodyParser.urlencoded({extended:true}));


mongoose.connect("mongodb://localhost:27017/farmersindia", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const testSchema = {
    mail: String,
    feedback: String
}

const Note = mongoose.model("Note", testSchema);

app.get("/", function(req,res){
    res.sendFile(path.join( __dirname + "/index.html"));
})

var Schema =mongoose.Schema;



var CropsSchema = new Schema({
    State_Name : String,
    District_Name : String,
    Crop_Year : String,
    Season : String,
    Crop : String,
    Crop : String
  });

  var Crops = mongoose.model('crops',CropsSchema);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
      extended:true
  }));

app.get('/crops', function (req, res){
    Crops.find({}, function(err, crops){
        if(err){
            res.send('something went really wrong.. ');
            next();
        }
        res.json(crops);
    });
})

app.post("/", function(req, res)
{
    let newNote = new Note({
        mail: req.body.mail,
        feedback: req.body.feedback
    });
    newNote.save();

    res.redirect("/");
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})

