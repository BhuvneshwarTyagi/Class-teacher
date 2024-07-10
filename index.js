const app=require("./app");


const startapp=()=>{
  app.listen(8011,()=>{
    console.log('Auth Backend running on port ',`${8011}`);
  })
};

startapp();
