// const { match } = require('assert')
const fs = require('fs')
const path = require('path')
const marked = require('marked')
const { title } = require('process')

// determina si la ruta existe, retorna(Booleano)
const routeExist = routePath => fs.existsSync(routePath)
// determina si es una ruta absoluta retorna(Booleano)
const pathAbsolute = routePath => path.isAbsolute(routePath)

// Para obtener la ruta absoluta EN CASO DE SER RELATIVA
const getAbsolute = routePath => (pathAbsolute(routePath) ? routePath : path.resolve(routePath))

// determina si es un directorio, retorna(Booleano)
const isADirectory = route => fs.statSync(route).isDirectory()

const fileExt = routePath => path.extname(routePath)

// Leer un directorio
const readDirectory = route => fs.readdirSync(route)

// --------------------------------Si es un directorio que haga un foreach y encuentre los archivos ------------------------------------------------
// retorna un array solo con archivos .md (ruta absoluta))
const onnlyFilesMD = routePath => {
  let arrayFileMD = []
  let routeAbsolute = getAbsolute(routePath)

  if (!isADirectory(routeAbsolute)) {
    if (fileExt(routeAbsolute) === '.md') {
      arrayFileMD.push(routeAbsolute)
    }
  } else {
    readDirectory(routePath).forEach(element => {
      const addRoute = path.join(routeAbsolute, element)
      const allFiles = onnlyFilesMD(addRoute)
      arrayFileMD = arrayFileMD.concat(allFiles)
    })
  }
  return arrayFileMD
}

console.log(onnlyFilesMD(getAbsolute('testDocuments')))

//Leer archivo  de forma asincrónica todo el contenido de un archivo.
const readFilePath = (routePath, callback) => fs.readFile(routePath, 'utf8', callback)
// lee el archivo
const readDocumentMD = document => fs.readFileSync(document, 'utf-8')
// console.log(readDocumentMD(getAbsolute('README2.md')))

// ----------------------------------------------------Prueba de leer un archivo asincrono ------------------------------------------------------
// readFilePath('README.md', (err, data) => {
//   if (err) throw err
//   console.log(data)
// })
// / retorna el contenido del path

// Obtener los links
// retorna un array de objetos con tres propiedades por cada link
// ---------------------------------------------------Option 1 Obtener Links----------------------------------------------------------------
// const readFile = routePath => {
//   const link = []
//   return new Promise((resolve, reject) => {
//     readFilePath(routePath, (error, data) => {
//       if (error) {
//         reject('ocurrio un error')
//       } else {
//         const regex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/g
//         // let macht = regex.test(data)
//         console.log(typeof data)
//         const arrayData = data.split(' ')
//         // const regex = /\[(.+?)\]\(https?:\/\/[^\s)]+)\)/g:
//         let mach = regex.exec(data)
//         console.log(mach)
//         arrayData.forEach(file => {
//           // let regex = /\[(.+?)\]\(https?:\/\/[^\s)]+)\)/g
//           let mach = regex.exec(file)
//           console.log(file)
//           console.log(file.match(regex))
//         })
//         // while (macht == null) {
//         //   link.push({
//         //     href: match[2],
//         //     text: match[1],
//         //     file: routePath,
//         //   })
//         //   macht.exec(data)
//         // }
//         console.log('Cada link', link)
//         resolve('Los liniks de la ruta')
//       }
//     })
//   })
// }

// console.log(readFile(getAbsolute('README2.md')))

// --------------------------------Option 2 Obtener Links------------------------------------------------
const getLinks = array => {
  const renderer = new marked.Renderer()
  const arrayLink = []
  array.forEach(filePath => {
    const file = fs.readFileSync(filePath, 'utf8')

    renderer.link = (href, t, text) => {
      const objLink = {
        href,
        text,
        path: filePath,
      }
      arrayLink.push(objLink)
    }
    marked.marked(file, { renderer })
  })
  return arrayLink
}

console.log(getLinks(onnlyFilesMD('testDocuments')))
// console.log(getLinks(onnlyFilesMD('../DEV003-MD-LINKS')))

// -------------------------------- Funcion para revisar el estado de los enlaces ------------------------------------------------

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
