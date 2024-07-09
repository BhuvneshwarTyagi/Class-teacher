// require("./database/database")

const express=require("express");
const bodyParser=express.json;
const routes=require("./routes/index");
const rateLimit = require('express-rate-limit');
require("./backend/database");
const cors = require('cors');
const app=express();
app.use(cors());
app.options('*', cors());
const limiter = rateLimit({
    windowMs: 60000, // 15 minutes
    max: 5, // limit each IP to 100 requests per windowMs
    message: 'Too many requests, please try again later.'
  });
app.use(limiter);
app.use(bodyParser());

app.use("/classTeacher",routes);

module.exports=app;