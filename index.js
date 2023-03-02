const fs = require('fs')
const path = require('path')
const marked = require('marked')

// --------------------------------------------------determina si la ruta existe, retorna(Booleano)-----------------------------------
const routeExist = routePath => fs.existsSync(routePath)
// -------------------------------------------------- determina si es una ruta absoluta retorna(Booleano)------------------------------
const pathAbsolute = routePath => path.isAbsolute(routePath)

// -------------------------------------------------- Para obtener la ruta absoluta EN CASO DE SER RELATIVA----------------------------
const getAbsolute = routePath => (pathAbsolute(routePath) ? routePath : path.resolve(routePath))

// --------------------------------------------------determina si es un directorio, retorna(Booleano)----------------------------------
const isADirectory = route => fs.statSync(route).isDirectory()

// --------------------------------------------------obtiene la extension del archivo---------------------------------------------------
const fileExt = routePath => path.extname(routePath)

// Leer un directorio
const readDirectory = route => fs.readdirSync(route)

// --------------------------------Si es un directorio que haga un foreach y encuentre los archivos -------------------------------------
// -------------------------------------- retorna un array solo con archivos .md (ruta absoluta))----------------------------------------
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
// console.log(onnlyFilesMD('README2.md'))
// -------------------------Leer archivo  de forma asincrónica todo el contenido de un archivo.--------------------------------
const readFilePath = routePath => {
  return new Promise(function (resolve, reject) {
    fs.readFile(routePath, 'utf8', (error, data) => {
      if (error) {
        reject(error)
      }
      resolve(data)
    })
  })
}
// -------------------------Leer archivo  de forma sincrónica todo el contenido de un archivo.---------------------------
const readDocumentMD = document => fs.readFileSync(document, 'utf-8')
// console.log(readDocumentMD(getAbsolute('README2.md')))

// ---------------------------------------------------- Opcion 1 Prueba de leer un archivo asincrono ------------------------------------------------------
const getLinks = routePath => {
  // console.log(onnlyFilesMD(routePath))
  return new Promise(function (resolve, reject) {
    const renderer = new marked.Renderer()
    const arrayLink = []
    onnlyFilesMD(routePath).forEach(filePath => {
      readFilePath(filePath)
        .then(result => {
          const file = result

          renderer.link = (href, t, text) => {
            const objLink = {
              href,
              text,
              path: filePath,
            }
            arrayLink.push(objLink)
          }

          marked.marked(file, { renderer })
          // console.log(arrayLink)s
          resolve(arrayLink)
        })
        .catch(error => {
          console.log(error)
          reject('Error no hay Links')
        })
    })
  })

  // console.log(arrayLink)
  // return arrayLink
}

getLinks('testDocuments').then(res => console.log(res))
// console.log(getLinks('testDocuments'))

// --------------------------------Option 2 Obtener Links sincronicos ------------------------------------------------
// const getLinks = array => {
//   const renderer = new marked.Renderer()
//   const arrayLink = []
//   array.forEach(filePath => {
//     const file = fs.readFileSync(filePath, 'utf8')

//     renderer.link = (href, t, text) => {
//       const objLink = {
//         href,
//         text,
//         path: filePath,
//       }
//       arrayLink.push(objLink)
//     }
//     marked.marked(file, { renderer })
//   })
//   return arrayLink
// }

// console.log(getLinks(onnlyFilesMD('testDocuments')))

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
