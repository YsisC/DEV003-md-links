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

//   })
// -------------------------------- Prueba 1 Funcion de Obtener Status Ok o Fail  sincronica------------------------------------------------
//Paso 1 Crear una funcion
//Paso 2 debe recibir un array con objetos de links href, text y file
//Paso 3 debe iterar el array con obj y retornar los valores de href, text y file

//Debe retornar un nuevo objeto con los link

const getStatusLink = route => {
  const arrayLinkStatus = []
  getLinks(route)
    .then(result => {
      const promise = result.map(objLink => {
        fetch(objLink.href)
          .then(response => {
            const objStatusLink = {
              href: response.url,
              text: objLink.text,
              file: objLink.file,
              status: response.status,
              message: response.ok ? 'ok' : 'fail',
            }
            console.log(objStatusLink)
            // arrayLink.push(objLink)
            return objStatusLink
          })
          .catch(err => {
            err
          })
      })

      return promise.push(objStatusLink)
    })
    .catch(err => err)
}

// console.log(getStatusLink('README2.md'))

// -------------------------------- Prueba 2 Funcion de Obtener Status Ok o Fail  asincronica----------------------------------
// const getStatusLink = route => {
//   return Promise.all(route => {
//     getLinks(route).then(result => {
//       const arrayLinkStatus = []
//       result.map(objLink => {
//         return fetch(objLink.href)
//           .then(response => {
//             const objStatusLink = {
//               href: response.url,
//               text: objLink.text,
//               file: objLink.file,
//               status: response.status,
//               message: response.ok ? 'ok' : 'fail',
//             }
//             // console.log(objStatusLink)
//             arrayLinkStatus.push(objStatusLink)
//             return arrayLinkStatus
//             // resolve(arrayLinkStatus)
//           })
//           .catch(err => {
//             return err
//           })
//       })
//     })
//   })
// }
// // console.log(arrayLinkStatus)
// // resolve(promise)

// getStatusLink('README2.md')
//   .then(res => console.log(res))
//   .catch(err => console.log(err))

module.exports = {
  pathAbsolute,
  routeExist,
  getAbsolute,
  getLinks,
  getStatusLink,
}
