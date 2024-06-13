const app=require("./app");


const startapp=()=>{
  app.listen(2000,()=>{
    console.log('Auth Backend running on port ',`${2000}`);
  })
};

startapp();