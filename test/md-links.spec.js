const {mdLinks }= require('../index.js')

describe('mdLinks', () => {

  // it('should...', () => {
  //   console.log('FIX ME!');
  // });
  it('should return a new promise.', async () => {
 await expect(mdLinks()).toBe( typeof Promise)
  });
  it('should reject when a path doesnt exits.', () => {
    return mdLinks("/ruta/doesntexist.md").catch((error)=>{
    expect(error).toBe('la ruta no existe');
    })
     });
});
