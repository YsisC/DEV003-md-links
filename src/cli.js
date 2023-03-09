const { mdLinks } = require('./index')
// const { process } = require('process')

//Total de links
const totalLinks = array => `Total: ${array.length}.`

//links unicos
const uniqueLink = array => {
  const unique = [...new Set(array.map(link => link.href))]
  return (stats = `Unique: ${unique.length}`)
}

const brokenLinks = array => {
  const broken = array.filter(link => (link.ok = 'fail' && link.status >= 400))
  return (stats = `Broken: ${broken.length}`)
}
// console.log(
//   brokenLinks([
//     {
//       href: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
//       text: 'What exactly is Node.js? - freeCodeCamp',
//       file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\README2.md',
//       status: 200,
//       ok: 'ok',
//     },
//     {
//       href: 'https://www.drauta.com/que-es-nodejs-y-a-que-sirve',
//       text: '¿Qué es Node.js y para qué sirve? - drauta.com',
//       file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\README2.md',
//       status: 404,
//       ok: 'fail',
//     },
//   ])
// )
const option = process.argv.slice(2)
const path = process.argv[2]
console.log(path)
console.log(option)

const validate = option.includes('--validate') || option.includes('--v')
const stats = option.includes('--stats') || option.includes('--s')
const help = option.includes('--help') || option.includes('--h')

mdLinks(path, { validate })
  .then(resolve => {
    // console.log(resolve)
    const links = resolve
    if (validate) {
      // console.log('entro')
      console.log(links.flat())
    }
  })
  .catch(error => {
    console.log(error)
  })
