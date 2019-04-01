const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser=require("body-parser");
const users = require("./routes/api/users");

const db = require("./config/keys").mongoURI;

// 使用app-parser中间件
app.use(bodyParser.urlencoded({extend:false}));
app.use(bodyParser.json());

mongoose.connect(db,{ useNewUrlParser: true })
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/users",users);

app.get("/",(req,res) =>{
    res.send("Hello World!");
})

const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`Server running on port ${port}`);
})