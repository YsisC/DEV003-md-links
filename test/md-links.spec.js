const { mdLinks } = require('../index.js')

describe('mdLinks', () => {
  // it('should return a new promise.', () => {
  //   const path = 'README.md'
  //   return mdLinks(path).then(data => {
  //     expect(mdLinks(data)).toHavebeenCalled()
  //   })
  // })

  it('should reject when a path doesnt exits.', () => {
    return mdLinks('/ruta/doesntexist.md').catch(error => {
      expect(error).toBe('este archivo no existe')
    })
  })
})
