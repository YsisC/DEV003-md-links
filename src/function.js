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
// console.log(onnlyFilesMD('testDocuments'))s
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

// ----------------------------------------------------  Prueba de leer un archivo asincrono ------------------------------------------------------
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
              file: filePath,
            }
            arrayLink.push(objLink)
          }

          marked.marked(file, { renderer })
          resolve(arrayLink)
        })
        .catch(error => {
          console.log(error)
          reject('Error no hay Links')
        })
    })
  })
}

// getLinks('testDocuments').then(res => console.log(res))

// --------------------------------  Funcion de Obtener Status Ok o Fail  asincronica----------------------------------

const getStatusLink = path => {
  // console.log(arrayLinks)
  return new Promise(resolve => {
    getLinks(path).then(resultArray => {
      let arrayPromise = []

      resultArray.forEach(link => {
        const promiseFetch = fetch(link.href)
        arrayPromise.push(promiseFetch)
      })
      Promise.allSettled(arrayPromise).then(result => {
        let okResult = ''
        for (let i = 0; i < result.length; i++) {
          if ((result[i].status = 'fulfilled')) {
            result[i].value.ok ? (okResult = 'ok') : (okResult = 'fail')
            resultArray[i].status = result[i].value.status
            resultArray[i].ok = okResult
          } else {
            // console.log('status', result[i].reason.cause)
            okResult = 'fail'
            resultArray[i].status = result[i].value.status
            resultArray[i].ok = okResult
          }
          resolve(resultArray)
        }
      })
    })
  })
}

module.exports = {
  pathAbsolute,
  routeExist,
  getAbsolute,
  getLinks,
  getStatusLink,
  isADirectory,
  fileExt,
  readDirectory,
  onnlyFilesMD,
  readFilePath,
}
