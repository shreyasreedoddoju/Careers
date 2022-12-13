const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const _ = require("lodash");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs');

mongoose.set('strictQuery', true);

mongoose.connect("mongodb://127.0.0.1:27017/formDB", {
    useNewURLParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to db")
}).catch((err) => {
    console.log(err);
});

const formSchema = {
    jobtype:{
        type:String
    },
    name: {
        type: String,
        required: true,
        minLength: [4, "Minimum Length should be 4 chracters"]
    },
    email: {
        type: String,
        required: true,
        unique: true

    },
    number: {
        type: Number,
        required: true,
        unique: true,
        min: 10
    }
}

const Form = mongoose.model("Form", formSchema);

const postSchema = {
    
    jobtitle: String,
    jobdetails : String,
    jobdescription : String

}

const Post = mongoose.model("Post", postSchema);

app.get("/", (req, res) => {
    
    res.render("index");
});

app.get("/:posttitle", (req, res) => {
    const params1 = req.params.posttitle;
    const title = Post.findOne({jobtitle: params1});
    Post.findOne({jobtitle: params1}, function(err, title){

        res.render("posting", {
     
          title: title
     
          });
     
      });
});

app.get("/posting/compose",(req,res)=>{
    
    res.render("compose");
  
});

app.post("/:posttitle", (req, res) => {

    const jobtype = req.body.jobtype;
    const name = req.body.name;
    const email = req.body.email;
    const number = req.body.number;

    const form = new Form({
        jobtype: jobtype,
        name: name,
        email: email,
        number: number


    });


    console.log(form);

    form.save(function (err) {
        if (!err) {
            res.redirect("/");
        } else {
            res.send(err);
        }
    });

});

app.post("/posting/compose",(req,res)=>{


    let jobtitle = req.body.jobtitle;
    let jobdetails = req.body.jobdetails;
    let jobdescription = req.body.jobdescription;

    const post = new Post({

        jobtitle: jobtitle,
        jobdetails: jobdetails,
        jobdescription: jobdescription

    });
    console.log(post);

    post.save(function (err) {
        if (!err) {
            res.redirect("/posting/compose");
        } else {
            res.send(err);
        }
    });

  

});



app.listen(5050, function () {
    console.log("Server is listening on port 5000...")
});