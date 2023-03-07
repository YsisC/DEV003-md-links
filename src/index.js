const { routeExist, getAbsolute, getStatusLink, getLinks } = require('./function')

// -------------------------------- Funcion de MDLikns ------------------------------------------------

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    //Identifica si la ruta existe
    const pathAbsolute = getAbsolute(path)

    if (routeExist(pathAbsolute)) {
      // const file = getLinks(res => res)
      // resolve(file)
      //Chequear o converir a una ruta absoluta
      //Probar si esa ruta absoluta es un archivo
      // si es un directorio

      if (options.validate) {
        console.log('es verdadero')
        const valid = getStatusLink(pathAbsolute).then(link => link)

        resolve(valid)
      } else if (!options.validate) {
        console.log('es falso')
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

// mdLinks('testDocuments', { validate: false })
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

mdLinks('README2.md', { validate: true })
  .then(res => console.log(res))
  .catch(err => console.log(err))

module.exports = {
  mdLinks,
}
