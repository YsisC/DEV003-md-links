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
} = require('../src/function.js')

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
    // console.log(getAbsolute(path))
    expect(getAbsolute(path)).toBe('C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\test.md')
  })
})
// -------------Si  es un directorio --------

describe('isADirectory', () => {
  it('should return a directory .', () => {
    const path = 'README.md'

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
    // console.log(readDirectory(path))
    expect(readDirectory(path)).toEqual(['otherDocuments', 'test.md', 'test2.txt'])
  })
})
// -------------Retornar un array de archivos md --------
describe('onnlyFilesMD', () => {
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
        // console.log(re)
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
        console.log(links)
        expect(links).toBe(typeof object)
        // console.log(re)
      })
      .catch(error => {
        {
          error
        }
      })
  })
})

// -------------Si no existe la ruta-------
describe('mdLinks', () => {
  it('should reject when a path doesnt exits.', () => {
    return mdLinks('/ruta/doesntexist.md').catch(error => {
      expect(error).toBe('Este archivo no existe')
    })
  })
})
