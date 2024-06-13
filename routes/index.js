const express=require("express");
const router=express.Router();

//const update=require("./fetch");
const fetch=require("./fetch");
const create=require("./create");
//const update= require('./update')
router.use("",create);
router.use("/fetch",fetch);
// router.use("",update);
// router.post("/test",(req,res)=>{
//     res.status(400).json({
//         message: "success"
//     })
// })
//router.use("",update);

module.exports=router;