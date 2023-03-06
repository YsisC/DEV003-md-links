const { mdLinks } = require('../src/index')
// import mdLinks fro
const { routeExist, pathAbsolute, getAbsolute } = require('../src/function.js')

// -------------Si existe la ruta--------
describe('routeExist', () => {
  it('should return a true.', () => {
    const path = 'README.md'
    expect(routeExist(path)).toBe(true)
  })
  it('should return a false.', () => {
    const path = 'README5.md'
    expect(routeExist(path)).toBe(false)
  })
})

// -------------Si  la ruta es absoluta --------

describe('pathAbsolute', () => {
  it('should return patAbsolute  true .', () => {
    const path = 'README.md'
    // console.log(pathAbsolute(path))
    expect(pathAbsolute(path)).toBe(false)
  })
})
// -------------Si  la ruta es absoluta --------

describe('getAbsolute', () => {
  it('should return a routAbsolute.', () => {
    const path = 'README2.md'
    // console.log(getAbsolute(path))
    expect(getAbsolute(path)).toBe('C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\README2.md')
  })
})

// -------------Si existe la ruta--------
describe('mdLinks', () => {
  it('should reject when a path doesnt exits.', () => {
    return mdLinks('/ruta/doesntexist.md').catch(error => {
      expect(error).toBe('Este archivo no existe')
    })
  })
})
