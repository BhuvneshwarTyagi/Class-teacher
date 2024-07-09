const mongoose=require("mongoose");


//url
const MONODBB_URI="mongodb+srv://metaphile:yTLGBXEwnMXpUh03@demoerp.2c96mjm.mongodb.net/?retryWrites=true&w=majority&appName=DemoErp";
const connectToDB =async()=>{
    try {
        var output;
        await mongoose.connect(MONODBB_URI,{dbName:"DemoERP"});
        console.log("DB Connected");
        return output;
    } catch (error) {
        console.log(error);
    }
};

connectToDB();