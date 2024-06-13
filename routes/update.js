// const express = require("express");
// const router = express.Router();
// const Timetable = require("../backend/schemas");
// const verifyAccessToken = require('./../verification/verifyToken')

// router.put("/update", async (req, res) => {
//     const decodedToken = verifyAccessToken(req.body.accessToken);
//     if (decodedToken.valid && (decodedToken.decoded.designation === 'Admin' || decodedToken.decoded.designation === 'Owner' )) {
//         try {

//             const classRange = req.body.classRange;
//             const update= req.body.update;
//             if (!classRange) {
//                 throw { message: "Class range is not specified" };
//             }
//             if (!update) {
//                 throw { message: "No Update is not specified" };
//             }
//             let updateFields = {};
//             for (let key in update) {
//                 if (key !== '_id') { // Exclude the _id field
//                     updateFields[`${key}`] = update[key];
//                 }
//             }
//             const filter = {
//                 classRange
//             };
//             await Timetable.updateOne(
//                 filter,
//                 { $set: updateFields }
//             );

//             res.status(200).json({
//                 status: true
//             });
//         }
//         catch (error) {
//             res.status(400).json({
//                 error: error.message
//             });
//         }
//     }
//     else {
//         res.status(400).json({
//             error: "You are not permitted to access this data. Please contact the admin",
//         });
//     }
// });



// module.exports = router;