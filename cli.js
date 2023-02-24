const {mdLinks} = require('./index')
// import mdLinks from "./index.js";
mdLinks('./README.md')
.then(()=>{})
.catch(error=>{
    console.log(error);
})