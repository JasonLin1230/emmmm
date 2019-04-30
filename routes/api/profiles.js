const express=require("express");
const router=express.Router();
const Profile=require("../../models/Profile");
const passport = require("passport"); 

//$route GET /api/profiles/test
//@desc 返回请求的json数据
//access public
// router.get('/test', (req, res) => {
//     res.json({ msg: 'login works' });
// });

//$route POST /api/profiles/add
//@desc 添加信息接口
//access private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res) => {
    const profilesField={};
    if(req.body.type) profilesField.type = req.body.type;
    if(req.body.income) profilesField.income = req.body.income;
    if(req.body.expend) profilesField.expend = req.body.expend;
    if(req.body.cash) profilesField.cash = req.body.cash;
    if(req.body.remark) profilesField.remark = req.body.remark;
    if(req.body.description) profilesField.description = req.body.description;

    new Profile(profilesField).save().then(data => {
        res.json(data);
    })
})

//$route GET /api/profiles
//@desc 获取所有信息接口
//access private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.find()
           .then(data => {
               if(!data){
                   res.status(404).json("没有数据！");
               }else{
                   res.json(data);
               }
           })
           .catch(err => {
                res.status(500).json("服务器内部错误！"+err);
           })
})


//$route GET /api/profiles/:id
//@desc 获取单个信息接口
//access private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.find({_id:req.body._id})
           .then(data => {
               if(!data){
                   res.status(404).json("没有数据！");
               }else{
                   res.json(data);
               }
           })
           .catch(err => {
                res.status(500).json("服务器内部错误！"+err);
           })
})

//$route POST /api/profiles/edit/:id
//@desc 编辑单个信息接口
//access private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    const profilesField={};
    if(req.body.type) profilesField.type = req.body.type;
    if(req.body.income) profilesField.income = req.body.income;
    if(req.body.expend) profilesField.expend = req.body.expend;
    if(req.body.cash) profilesField.cash = req.body.cash;
    if(req.body.remark) profilesField.remark = req.body.remark;
    if(req.body.description) profilesField.description = req.body.description;

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profilesField},
        {new:true})
        .then(data => {
        res.json(data);
    }).catch(err => {
        res.status(500).json("服务器内部错误！"+err);
    })
})

//$route delete /api/profiles/delete/:id
//@desc 删除信息接口
//access private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) => {
    Profile.findOneAndDelete({_id:req.params.id})
           .then(profile => {
                profile.save().then(profile => {
                   res.json(profile);
               })
           })
           .catch(err => {
                res.status(500).json("服务器内部错误！"+err);
           })
})

module.exports = router;