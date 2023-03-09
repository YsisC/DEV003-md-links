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
const { expect, describe, jest, it } = require('@jest/globals')

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
    // console.log(onnlyFilesMD('test.md'))
    expect(onnlyFilesMD(path)).toEqual([
      'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
      'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\test.md',
    ])
  })
})
// -------------Retornar un string de un archivo md --------
describe('readFilePath', () => {
  it('should return readFilePath string.', () => {
    const path = './README2.md'

    return readFilePath(path)
      .then(re => {
        // console.log(typeof re)
        expect(re).toBe(typeof string)
      })
      .catch(error => {
        {
          error
        }
      })
  })
})

// console.log(onnlyFilesMD('testDocuments'))
// -------------Retornar un array de link de un archivo md --------
describe('getLinks', () => {
  it('should return getLinks.', () => {
    const path = 'testDocuments'

    return getLinks(path)
      .then(links => {
        // console.log(links)
        expect(links).toEqual([
          {
            href: 'https://nodejs.org/es/about/',
            text: 'Acerca de Node.js - Documentación oficial',
            file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
          },
          {
            href: 'https://nodejs.org/api/fs.html',
            text: 'Node.js file system - Documentación oficial',
            file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
          },
          {
            href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
            text: 'Node.js http.get - Documentación oficial',
            file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
          },
          {
            href: 'https://es.wikipedia.org/wiki/Node.js',
            text: 'Node.js - Wikipedia',
            file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
          },
        ])
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

// -------------Const Link que arroja los links de getLinksStatus --------

const linkValidate = [
  {
    href: 'https://nodejs.org/es/about/',
    text: 'Acerca de Node.js - Documentación oficial',
    file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
    status: 200,
    ok: 'ok',
  },
  {
    href: 'https://nodejs.org/api/fs.html',
    text: 'Node.js file system - Documentación oficial',
    file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
    status: 200,
    ok: 'ok',
  },
  {
    href: 'https://nodejs.org/api/http.html#http_http_get_options_callback',
    text: 'Node.js http.get - Documentación oficial',
    file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
    status: 200,
    ok: 'ok',
  },
  {
    href: 'https://es.wikipedia.org/wiki/Node.js',
    text: 'Node.js - Wikipedia',
    file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\testDocuments\\otherDocuments\\test2.md',
    status: 200,
    ok: 'ok',
  },
]
// getStatusLink('./testDocuments/otherDocuments').then(resultado => {
//   console.log(resultado)
// })

// -------------------- Mock  1 getStatusLinks --------
global.fetch = jest.fn(() => {
  return Promise.resolve({ status: 200, ok: 'ok' })
})

// --------------------  getStatusLinks ------------
describe('getStatusLink', () => {
  it('should return getStatusLink.', async () => {
    const path = './testDocuments/otherDocuments'
    // console.log(getStatusLink(path))
    const data = await getStatusLink(path)
    console.log('Prueba1')
    // console.log(data)
    expect(data).toEqual(
      linkValidate
      //
    )
  })
})

// // ------------- Opcion 2 getstatusLink--------

// -------------Si no existe la ruta-------
describe('mdLinks', () => {
  it('should reject when a path doesnt exits.', () => {
    return mdLinks('/ruta/doesntexist.md').catch(error => {
      expect(error).toBe('Este archivo no existe')
    })
  })
})
