const express = require("express");
const router = express.Router();
const { classTeacherModel, TeacherModel } = require("../backend/schemas");
const verifyAccessToken = require('./../verification/verifyToken')


router.post("/assign", async (req, res) => {
    const decodedToken = verifyAccessToken(req.body.accessToken);
    if (decodedToken.valid && (decodedToken.decoded.designation === 'Admin' || decodedToken.decoded.designation === 'Owner')) {
        try {
            const Class = req.body.class;
            const section = req.body.section;
            const TeacherEmail = req.body.teacherEmail;

            if (!Class) {
                throw { message: "Class is not specified" };
            }
            if (!section) {
                throw { message: "Section is not specified" };
            }
            if (!TeacherEmail) {
                throw { message: "Teacher email is not specified" };
            }
            const teacherDoc=await TeacherModel.findOne({ email: TeacherEmail }, {
                _id: 1,
            }).lean();
            if(!teacherDoc){
                throw {message : "No teacher found"};
            }
            await classTeacherModel.findOneAndDelete(
                { id: teacherDoc._id },
            ).lean();
            await classTeacherModel.findOneAndUpdate(
                { class: Class, section: section },
                {
                    class: Class,
                    section: section,
                    id: teacherDoc._id,
                },
                { upsert: true, new: true, setDefaultsOnInsert: true }
            ).lean();
            res.status(200).json({
                status: true
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