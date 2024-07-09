const express = require("express");
const verifyAccessToken = require('./../verification/verifyToken')
const router = express.Router();
const { classTeacherModel,TeacherModel } = require("../backend/schemas");


router.post("/single", async (req, res) => {
    const decodedToken = verifyAccessToken(req.body.accessToken);
    if (decodedToken.valid && (decodedToken.decoded.designation === 'Admin' || decodedToken.decoded.designation === 'Owner' || decodedToken.decoded.designation === 'Student')) {
        try {
            const Class = req.body.class;
            const section = req.body.section;
            if (!Class) {
                throw { message: "Class is not specified" };
            }
            if (!section) {
                throw { message: "Section is not specified" };
            }
            await classTeacherModel.findOne(
                { class: Class, section: section },
                { _id: 0, class: 0, section: 0, __v: 0 }
            ).lean().then(async (value) => {
                const teacherDoc = await TeacherModel.findOne({_id: value.id},{_id:0, name:1,profileLink:1,employeeId:1,email:1}).lean();
                    if(!teacherDoc){
                        throw {message : "No teacher found"};
                    }
                    delete value.id;
                    value.name = teacherDoc.name;
                    value.email = teacherDoc.email;
                    value.employeeId = teacherDoc.employeeId;
                    value.profileLink = teacherDoc.profileLink;
                res.status(200).json(value );
            });
        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
    else {
        res.status(400).json({
            error: "You are not permitted to access this data. Please contact the admin",
        });
    }
});

router.post("/multi", async (req, res) => {
    const decodedToken = verifyAccessToken(req.body.accessToken);
    if (decodedToken.valid && (decodedToken.decoded.designation === 'Admin' || decodedToken.decoded.designation === 'Owner' )) {
        try {
            const Class = req.body.class;
            const section = req.body.section;
            const skip = req.body.start  || 0;
            const limit = req.body.end || 25;
            const filter = {};
            if (Class) {
                filter.class = Class;
            }
            if (section) {
                filter.section = section;
            }
            await classTeacherModel.find(
                filter,
                { _id: 0, __v: 0 }
            ).skip(skip).limit(limit).lean().then(async (value) => {
                if(!value){
                    throw {message : "No Class teacher assign till now"};
                }
                for(var i =0 ;i<value.length ; i++){
                    const teacherDoc = await TeacherModel.findOne({_id: value[i].id},{_id:0, name:1,profileLink:1,employeeId:1,email:1}).lean();
                    if(!teacherDoc){
                        throw {message : "No teacher found"};
                    }
                    delete value[i].id;
                    value[i].name = teacherDoc.name;
                    value[i].email = teacherDoc.email;
                    value[i].employeeId = teacherDoc.employeeId;
                    value[i].profileLink = teacherDoc.profileLink;

                }
                
                res.status(200).json({ classTeachers: value });
            });


        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
    else {
        res.status(400).json({
            error: "You are not permitted to access this data. Please contact the admin",
        });
    }
});

router.post("/sections", async (req, res) => {
    const decodedToken = verifyAccessToken(req.body.accessToken);
    if (decodedToken.valid && (decodedToken.decoded.designation === 'Admin' || decodedToken.decoded.designation === 'Owner' )) {
        try {
            const Class = req.body.class;
            
           
            if (!Class) {
                throw {message: "Class is not specified"};
            }
            
            await classTeacherModel.find(
                {class : Class},
                { _id: 0, section:1,id:1 }
            ).lean().then(async (value) => {
                if(!value){
                    throw {message : "No Class teacher assign till now"};
                }
                for(var classteacher of value){
                    const teacherDoc = await TeacherModel.findOne({_id: classteacher.id},{_id:0, name:1,profileLink:1,employeeId:1,email:1}).lean();
                    if(!teacherDoc){
                        throw {message : "No teacher found"};
                    }
                    delete classteacher.id;
                    classteacher.name = teacherDoc.name;
                    classteacher.email = teacherDoc.email;
                    classteacher.employeeId = teacherDoc.employeeId;
                    classteacher.profileLink = teacherDoc.profileLink;

                }
                res.status(200).json({ sections: value });
            });


        }
        catch (error) {
            res.status(400).json({
                error: error.message
            });
        }
    }
    else {
        res.status(400).json({
            error: "You are not permitted to access this data. Please contact the admin",
        });
    }
});

module.exports = router;