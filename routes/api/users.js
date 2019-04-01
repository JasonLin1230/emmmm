const express=require("express");
const router=express.Router();
const User=require("../../models/User");

//$route GET /api/users/test
//@desc 返回请求的json数据
//access public
router.get('/test', (req, res) => {
    res.json({ msg: 'login works' });
});

//$route POST /api/users/register
//@desc 返回请求的json数据
//access public
router.post('/register', (req, res) => {
    //console.log(req.body);
    // res.json({ msg: 'login works' });
    // 查询数据库是否存在当前的邮箱
    User.findOne({email:req.body.email})
        .then((res) => {
            if(user){
                return res.status(400).json({msg:"邮箱已被注册"});
            }else{
                newUser=new User({
                    name:req.body.name,
                    emial:req.body.email,
                    avatar,
                    password:req.body.password
                })
            }
        })
});


module.exports = router;