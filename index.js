const fs = require('fs')
const path = require('path')
const marked = require('marked')

// determina si la ruta existe, retorna(Booleano)
const routeExist = routePath => fs.existsSync(routePath)
// determina si es una ruta absoluta retorna(Booleano)
const pathAbsolute = routePath => path.isAbsolute(routePath)

// Para obtener la ruta absoluta EN CASO DE SER RELATIVA
const getAbsolute = routePath => (pathAbsolute(routePath) ? routePath : path.resolve(routePath))

// determina si es un directorio, retorna(Booleano)
const isADirectory = route => fs.statSync(route).isDirectory()

//Leer archivo  de forma asincrónica todo el contenido de un archivo.
const readFilePath = (routePath, callback) => fs.readFile(routePath, 'utf8', callback)

const extPath = routePath => path.extname(routePath)

// console.log(pathAbsolute('./README.md'));
// console.log(getAbsolute('./test.md'));
// console.log(isADirectory('./README.md'));
// console.log(extPath('test.md'));

// Si es un directorio que haga un foreach y encuentre los archivos
// retorna un array solo con archivos .md (ruta absoluta))
const onnlyFilesMD = routePath => {
  let arrayFileMD = []
  let routeAbsolute = getAbsolute(routePath)

  if (!isADirectory(routeAbsolute)) {
    if (extPath(routeAbsolute) === '.md') {
      arrayFileMD.push(routeAbsolute)
    }
  }
  return arrayFileMD
}
// console.log(getAbsolute('README.md'))
console.log(onnlyFilesMD(getAbsolute('README.md')))

//Prueba de leer un archivo
// readFilePath('README.md', (err, data) => {
//   if (err) throw err
//   console.log(data)
// })
// / retorna el contenido del path

// lee el archivo
const readDocumentMD = document => fs.readFileSync(document, 'utf-8')
console.log(readDocumentMD(getAbsolute('README.md')))

// Obtener los links
// retorna un array de objetos con tres propiedades por cada link
const getLinks = routePath => {
  const render = new marked.Renderer()
  const arrayLink = []
  onnlyFilesMD(routePath).forEach(file => {
    render.link = (href, tittle, text) => {
      const objLink = {
        href,
        tittle,
        text,
      }
      arrayLink.push(objLink)
    }
    marked(readDocumentMD(file), { render })
  })
}

getLinks(getAbsolute('README.md'))

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
console.log(mdLinks(getAbsolute('README.md')))

module.exports = {
  mdLinks,
}
