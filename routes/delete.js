const express = require("express");
const router = express.Router();
const { classTeacherModel, TeacherModel } = require("../backend/schemas");
const verifyAccessToken = require('./../verification/verifyToken')

const extractToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({ error: "Authorization header is missing" });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: "Bearer token is missing" });
    }

    req.token = token;
    next();
};
router.delete("/delete", extractToken, async (req, res) => {
    const decodedToken = verifyAccessToken(req.token);
    if (decodedToken.valid && (decodedToken.decoded.designation === 'Admin' || decodedToken.decoded.designation === 'Owner')) {
        try {
            const Class = req.query.class;
            const section = req.query.section;

            if (!Class) {
                throw { message: "Class is not specified" };
            }
            if (!section) {
                throw { message: "Section is not specified" };
            }

            await classTeacherModel.findOneAndDelete(
                { class: Class, section: section },
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