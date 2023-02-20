const fs = require('fs');

const mdLinks= (path, options)=>{
return new Promise((resolve, reject) => {
  //Identifica si la ruta existe
if (fs.existsSync(path)) {
   //Chequear o converir a una ruta absoluta
} else{
  //Sino existe la ruta
  reject('la ruta no existe')
}
})
};
module.exports = {
mdLinks,
};
