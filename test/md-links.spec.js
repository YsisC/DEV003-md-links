const { mdLinks } = require('../src/index')
// import mdLinks fro
const {
  routeExist,
  pathAbsolute,
  getAbsolute,
  isADirectory,
  readDirectory,
  fileExt,
  onnlyFilesMD,
  readFilePath,
  getLinks,
  getStatusLink,
} = require('../src/function.js')
// let describe = ''
// let it = ''

// -------------Si existe la ruta--------
describe('routeExist', () => {
  it('should return a true.', () => {
    const path = 'README.md'
    expect(routeExist(path)).toBe(true)
  })
})

// -------------Si  la ruta es absoluta --------

describe('pathAbsolute', () => {
  it('should return patAbsolute  true .', () => {
    const path = 'test.md'

    expect(pathAbsolute(path)).toBe(false)
  })
})
// -------------Si  la ruta es absoluta --------

describe('getAbsolute', () => {
  it('should return a routAbsolute.', () => {
    const path = 'test.md'
    expect(getAbsolute(path)).toBe('C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\test.md')
  })
})
// -------------Si  es un directorio --------

describe('isADirectory', () => {
  it('should return a directory .', () => {
    const path = 'README.md'
    // console.log(isADirectory(path))
    expect(isADirectory(path)).toBe(false)
  })
})
// -------------Si debe retornar la extension del archivo --------

describe('fileExt', () => {
  it('should return a extension file .', () => {
    const path = 'README2.md'

    expect(fileExt(path)).toBe('.md')
  })
})
// -------------Retornar un array de archivos de un directorio --------

describe('readDirectory', () => {
  it('should return a file from the directory .', () => {
    const path = 'testDocuments'

    expect(readDirectory(path)).toEqual(['otherDocuments', 'test.md', 'test2.txt'])
  })
})
// -------------Retornar un array de archivos md --------
describe('onlyFilesMD', () => {
  it('should return onnlyFilesMD.', () => {
    const path = 'testDocuments'
    // console.log(onnlyFilesMD(path))
    expect(onnlyFilesMD(path)).toEqual([
      'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
      'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\test.md',
    ])
  })
})
// -------------Retornar un string de un archivo md --------
describe('readFilePath', () => {
  it('should return readFilePath string.', () => {
    const path = 'test.md'

    return readFilePath(path)
      .then(re => {
        //  console.log(typeof re))
        expect(re).toBe(typeof string)
      })
      .catch(error => {
        {
          error
        }
      })
  })
})
// -------------Retornar un array de link de un archivo md --------
describe('getLinks', () => {
  it('should return getLinks.', () => {
    const path = 'test.md'

    return getLinks(path)
      .then(links => {
        // console.log(links)
        expect(links).toBe(typeof object)
      })
      .catch(error => {
        {
          error
        }
      })
  })
  it('should return getLinks.', () => {
    const path = 'test.md'

    return getLinks(path)
      .then(links => {
        // console.log(typeof links)
        expect(links).toEqual(object)
      })
      .catch(error => {
        {
          error
        }
      })
  })
})
// -------------opcion 1 getStatus --------
// describe('getStatusLink', () => {
//   it('should return getStatusLink.', () => {
//     const path = 'README.md'

//     return getStatusLink(path)
//       .then(links => {
//         console.log(typeof links)
//         // expect(links).toBe(typeof object)
//       })
//       .catch(error => {
//         {
//           error
//         }
//       })
//   })
// })

// // ------------- Opcion 2 getstatusLink--------
// global.fetch = jest.fn(() => {
//   Promise.resolve({ status: 200, ok: 'ok' })
// })

// describe('getStatusLink', () => {
//   test('should return status y message ok.', () => {
//     const linkValidate = [
//       {
//         href: 'https://www.genbeta.com/desarrollo/node-js-y-npm',
//         text: 'Node.js y npm',
//         file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\README2.md',
//         status: 200,
//         ok: 'ok',
//       },
//     ]

//     // getLinks.mockResolvedValue(link)
//     return getStatusLink(route).then(data => {
//       console.log(data)
//       // expect(data).toEqual(linkValidate)
//     })
//     // const LinkFail =[
//     //   {
//     //     href: 'https://www.drauta.com/que-es-nodejs-y-a-que-sirve',
//     //     text: '¿Qué es Node.js y para qué sirve? - drauta.com',
//     //     file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\README2.md',
//     //     status: 404,
//     //     ok: 'fail'
//     //   },
//     // ]
//   })
// })
// -------------Si no existe la ruta-------
describe('mdLinks', () => {
  it('should reject when a path doesnt exits.', () => {
    return mdLinks('/ruta/doesntexist.md').catch(error => {
      expect(error).toBe('Este archivo no existe')
    })
  })
})
