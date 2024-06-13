const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const TeacherSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    gender: String,
    religion: String,
    employeeId: {type:String, unique:true},
    profileLink: String,
    phoneNumber: String,
    experience: String,
    education: String,
    token: String,
    aadhaarNumber: String,
    admin: Boolean,
    DOB: String,
    permanentAddress: String,
});

const classTeacher = new Schema({
    class:String,
    section: String,
    id: String
});

const classTeacherModel=mongoose.model("classTeacher",classTeacher);
const TeacherModel = mongoose.model("TeacherssDetails", TeacherSchema);

module.exports = {classTeacherModel,TeacherModel};