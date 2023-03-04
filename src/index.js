const { routeExist, pathAbsolute, getAbsolute, getLinks } = require('./function')
// const fetch = require('node-fetch')

// fetch('http://example.com/movies.json')
// -------------------------------- Funcion de MDLikns ------------------------------------------------

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Identifica si la ruta existe
    if (routeExist(path)) {
      //Chequear o converir a una ruta absoluta
      //Probar si esa ruta absoluta es un archivo
      // si es un directorio
      resolve('ruta')
      // resolve(getLinks(path))
    } else {
      //Sino existe la ruta
      reject('la ruta no existe')
    }
  })
}

module.exports = {
  mdLinks,
}
