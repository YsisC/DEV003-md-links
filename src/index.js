const fs = require('fs')
const { routeExist, getAbsolute, getStatusLink, getLinks } = require('./function')

// -------------------------------- Funcion de MDLikns ------------------------------------------------

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Identifica si la ruta existe
    const pathAbsolute = getAbsolute(path)
    const arrayLinkStatus = []

    if (routeExist(pathAbsolute)) {
      // const file = getLinks(res => res)
      // resolve(file)
      //Chequear o converir a una ruta absoluta
      //Probar si esa ruta absoluta es un archivo
      // si es un directorio

      if (options.validate) {
        const valid = getStatusLink(pathAbsolute)
        // console.log('es verdadero')
        resolve(arrayLinkStatus.push(valid))
      } else if (!options.validate) {
        // console.log('me tomo el falso')
        resolve(
          getLinks(pathAbsolute)
            .then(link => link)
            .catch(err => err)
        )
      }
    } else {
      //Sino existe la ruta
      reject('Este archivo no existe')
    }
  })
}

// mdLinks('README2.md', { validate: false })
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

// mdLinks('README2.md', { validate: true })
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

module.exports = {
  mdLinks,
}
