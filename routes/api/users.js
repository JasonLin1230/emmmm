const express=require("express");
const router=express.Router();
const User=require("../../models/User");
const bcrypt=require("bcrypt");
const gravatar=require("gravatar");
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys")
const passport = require("passport"); 

//$route GET /api/users/test
//@desc 返回请求的json数据
//access public
// router.get('/test', (req, res) => {
//     res.json({ msg: 'login works' });
// });

//$route POST /api/users/register
//@desc 返回请求的json数据
//access public
router.post('/register', (req, res) => {
    //console.log(req.body);
    // res.json({ msg: 'login works' });
    // 查询数据库是否存在当前的邮箱
    User.findOne({email:req.body.email})
        .then((user) => {
            if(user){
                return res.status(400).json("邮箱已被注册");
            }else{
                const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});
                newUser=new User({
                    name:req.body.name,
                    email:req.body.email,
                    password:req.body.password,
                    avatar,
                    identity:req.body.identity
                })
            }
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err){
                        throw err;
                    }else{
                        newUser.password=hash;
                    }
                    newUser.save()
                           .then(user => res.json(user))
                           .catch(err => console.log(err))
                });
            });
        })
});

//$route POST /api/users/login
//@desc 返回token
//access public
router.post('/login', (req, res) => {
    const email=req.body.email;
    const password=req.body.password;
    User.findOne({email})
        .then((user) => {
            if(!user){
                return res.status(404).json("当前用户不存在");
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch){
                        const rule={
                            id:user.id,
                            name:user.name,
                            avatar:user.avatar,
                            identity:user.identity
                        }
                        // jwt.sign("规则","加密方法","过期时间","箭头函数")
                        jwt.sign(rule,keys.secret,{expiresIn:3600}, (err,token) => {
                            if(err){
                                throw err;
                            }else{
                                res.json({
                                    success:true,
                                    token:"Bearer " + token,
                                })
                            }
                        })
                        // return res.json({msg:"success"});
                    }else{
                        return res.status(400).json("密码不正确");
                    }
                })
        })
});

//$route POST /api/users/current
//@desc 返回current user
//access private
router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) => {
    res.json({
        id:req.user.id,
        name:req.user.name,
        email:req.user.email,
        identity:req.user.identity
    });
})

module.exports = router;