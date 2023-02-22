const fs = require('fs');
const path = require('path');
// console.log(path);

// determina si es una ruta absoluta (Booleano)
const pathAbsolute = (routePath) => path.isAbsolute(routePath);

// Para obtener la ruta absoluta EN CASO DE SER RELATIVA
const getAbsolute = (routePath) => (pathAbsolute(routePath) ? routePath : path.resolve(routePath));

console.log(pathAbsolute('./README.md'));
console.log(getAbsolute('./README.md'));

const mdLinks= (path, options)=>{
return new Promise((resolve, reject) => {
  //Identifica si la ruta existe
if (fs.existsSync(path)) {
   //Chequear o converir a una ruta absoluta
   //Probar si esa ruta absoluta es un archivo
   // si es un directorio
   console.log('existe la ruta');
} else{
  //Sino existe la ruta
  reject('la ruta no existe')
}
})
};
// const md= fs.readdir( './pruebaDocs/test.md', 'utf8', callback )
// console.log(md);
module.exports = {
mdLinks,
};
