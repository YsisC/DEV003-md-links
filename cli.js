const {mdLinks} = require('./index');
const Color = require('colors');
// const color = Color('rgb(255, 255, 255)')

console.log("Hello World".bgMagenta);
console.log("Hello World".bgGreen);
console.log("Hello World".green);
// console.log(color.rgbNumber("Hola"));
// console.log("12154");
// console.log(color.hsl(320, 50%, 100%).string(Hola)); 

// import mdLinks from "./index.js";
mdLinks('./README.md')
.then(()=>{})
.catch(error=>{
    console.log(error);
})