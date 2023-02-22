const {mdLinks} = require('./index')
// import mdLinks from "./index.js";
mdLinks('src/noexste')
.then(()=>{})
.catch(error=>{
    console.log(error);
})