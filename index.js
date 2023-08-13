//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs"); 
const mongoose = require("mongoose");

const multer = require("multer");
const path = require('path');
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");


const app = express();



app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(session ({
secret : "Our little secret.",
resave : false,
saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb+srv://meghanand1234:GwtQm0EgyoZYBLui@cluster0.tp28rkh.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.set("useCreateIndex" , true);
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});



const PostSchema = new mongoose.Schema({
    title: String,
    content: String,
    username: String,
    imagePath: String,
    date: String,
    comments :[
        {
            username : String,
            comment : String,
            date : String
        }
    ],
    likes : [
        {
            username : String,
            date : String
        }]
});




userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User" , userSchema);

const Post = mongoose.model('Post', PostSchema);

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage });
  
passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var currentUser;


function getCurrentDate() {
    const dateObj = new Date();
    const day = String(dateObj.getDate()).padStart(2, '0'); // Add leading zero if day is single digit
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Add leading zero if month is single digit
    const year = dateObj.getFullYear();
  
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  


app.get("/" , function(req, res){
    res.render("home");
});



app.post("/posts" , function(req, res){
    var post = req.body.search;
    var link = "/posts/" + post;
    
        res.redirect(link);
}); 



app.get("/login" , function(req, res){
    res.render("login");
});



app.get("/register" , function(req, res){
    res.render("register");
});




app.get("/Main" , function(req, res){
    if(req.isAuthenticated()){
        if(Post.find()){
        Post.find({}).then((posts)=>{
            res.render("Main" , {User : currentUser , Post : posts });
        }).catch((err)=>{
            console.log(err);
        });}
        else{
            res.render("Main" , {User : currentUser , Post : [] , Date : []});
        }
        
    }else{
        res.redirect("/login");
    }
});




app.get('/logout', (req, res) => {

    if (!req.isAuthenticated()) {
      // Already logged out
      return res.redirect('/');
    } 
    else {
    req.logout(function(err) {
      if (err) {
        // Handle the error if there is one
        console.error('Logout error:', err);
        return res.status(500).send('Error during logout');
      }
      // Successful logout
      res.redirect('/');
    
    });
}
  });





app.get("/submit" , function(req, res){
    if(!req.isAuthenticated()){
        res.redirect("/login");
    }else{

    if(req.isAuthenticated()){
        res.render("submit");
    }else{
        res.redirect("/login");
    }

}
});



app.get("/posts/:postId" , function(req, res){

    if(!req.isAuthenticated()){
        res.redirect("/login");
    }else{

    const requestedPostId = req.params.postId;   
    Post.findOne({title : {$regex :requestedPostId }} ).then((post)=>{
        if (post == null || post.length === 0){
            res.redirect("/Main");}
        else{
        res.render("posts" , {Post : post});
        }
    }).catch((err)=>{
        console.log(err);
        
    });
}
});


app.get("/user" , function(req, res){
    if(!req.isAuthenticated()){
        res.redirect("/login");
    }else{

    if(req.isAuthenticated()){

        Post.find({username : currentUser}).then((posts)=>{
    
        res.render("user" , {User : currentUser , posts : posts.length , Post : posts});})
        .catch((err)=>{
            console.log(err);
        });
    }else{
        res.redirect("/login");
    }

}
});

app.get("/users/:userId" , function(req, res){
    if(!req.isAuthenticated()){
        res.redirect("/login");
    }else{
    const user = req.params.userId;
    if(req.isAuthenticated()){
        Post.find({username : user}).then((posts)=>{
    
        res.render("user" , {User : user , posts : posts.length , Post : posts});})
        .catch((err)=>{
            console.log(err);
        });
    }else{
        res.redirect("/login");
    }

}
});


app.post("/register" , function(req, res){
   User.register({username: req.body.username , email : req.body.user } , req.body.password )
   .then(function(user){
       passport.authenticate("local")(req, res, function(){
        currentUser = req.body.username;
        res.redirect("/Main");

       });
   })
   .catch(function(err){    
         console.log(err);
         res.redirect("/register");
    });
});



app.post("/like" , function(req, res){
    const postId = req.body.post_id;
    const username = currentUser;
    

    // Find the post by its unique identifier (postId).
    Post.findById(postId)
        .then((post)=>{
        if (!post) {
        return res.status(404).json({ error: "Post not found" });
        }
        else{
            const isLikedByCurrentUser = post.likes.some(like => like.username === username);

            if (isLikedByCurrentUser) {
              // User has already liked the post
                post.likes = post.likes.filter(like => like.username !== username);
                post.save();
            } else {
              // User hasn't liked the post yet
                post.likes.push({ username: username, date: getCurrentDate() });
                post.save();
                
            }
            console.log(post);
            res.redirect("/posts/" + post.title);
        }})
        .catch((err)=>{
            console.log(err);
        }
        );
});
        
    


app.post("/login" , function(req, res){

    const user = new User({
        username : req.body.username,
        password : req.body.password
    });

    req.login(user, function(err){
        if(err){
            console.log(err);
        }else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/Main");
                currentUser = req.body.username;
            });
        }
    }
    );
  
})



app.post("/upload", upload.single('image'), (req, res) => {
     // Save the image details to the database
  const title = req.body.title;
  const description = req.body.description;
  const formattedData = description.replace(/\r\n/g, "\n");
  const username = currentUser;
  const date = Date.now();
  const imagePath = req.file.path;
  

  const newPost = new Post({title : title , content : formattedData , username : username , imagePath : imagePath , date : getCurrentDate() });
  newPost.save()
  .then((image)=>{
    res.redirect("/Main");
  })
  .catch((err)=>{
    console.log(err);
  });
});



app.post("/comment" , function(req, res){
    const comment = req.body.comment;
    const username = currentUser;
    const date = getCurrentDate();
    const postId = req.body.title;
    const title = req.body.Name;
    

  // Find the post by its unique identifier (postId).
  Post.findById(postId)
    .then((post)=>{
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Create the new comment object.
    const newComment = {
      username: username,
      comment: comment,
      date: date,
    };

    
    post.comments.push(newComment);

    post.save()
   
    .then(()=>{ res.redirect("/posts/" + title);
    })
    .catch((err)=>{
        console.log(err);
    });

    })
    .catch((err)=>{
        console.log(err);
    });
});



app.listen(3000, function() {
    console.log("Server started on port 3000");
    });
