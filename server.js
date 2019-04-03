const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const users = require("./routes/api/users");
const passport = require("passport");

const db = require("./config/keys").mongoURI;

// 使用app-parser中间件
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(db,{ useNewUrlParser: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/users",users);
app.use(passport.initialize());

require("./config/passport")(passport);

// app.get("/",(req,res) =>{
//     res.send("Hello World!");
// })

const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})