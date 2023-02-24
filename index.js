const fs = require('fs');
const path = require('path');
// console.log(path);


// determina si la ruta existe, retorna(Booleano)
const routeExist = (routePath) => fs.existsSync(routePath);
// determina si es una ruta absoluta retorna(Booleano)
const pathAbsolute = (routePath) => path.isAbsolute(routePath);

// Para obtener la ruta absoluta EN CASO DE SER RELATIVA
const getAbsolute = (routePath) => (pathAbsolute(routePath) ? routePath : path.resolve(routePath));

// determina si es un directorio, retorna(Booleano)
const isADirectory = (route) =>  fs.statSync(route).isDirectory();

//Leer archivo
// const readFilePath =(routePath,callback)=> fs.readFile(routePath,'utf8', callback)

console.log(routeExist('./README.md'));
console.log( typeof routeExist('./README.md'));
console.log(pathAbsolute('./README.md'));
console.log(getAbsolute('./README.md'));
console.log(isADirectory('./README.md'));

// readFilePath('README.md',(err,data)=>{
//   if (err) throw err;
//   console.log(data);

// })


const mdLinks= (path, options)=>{
return new Promise((resolve, reject) => {
  //Identifica si la ruta existe
if (routeExist(path)) {
   //Chequear o converir a una ruta absoluta
   //Probar si esa ruta absoluta es un archivo
   // si es un directorio
   resolve('existe la ruta');
} else{
  //Sino existe la ruta
  reject('la ruta no existe')
}
})
};

module.exports = {
mdLinks,
};
