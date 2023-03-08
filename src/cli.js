const { mdLinks } = require('./index')
// const Color = require('colors')

// console.log('Hello World'.green)
// console.log(process.argv)
// if (process.argv.includes('--validate'))
// import mdLinks from "./index.js";

//Total de links
const totalLinks = array => `Total: ${array.length}.`

//links unicos
const uniqueLink = array => {
  const unique = [...new Set(array.map(link => link.href))]
  return (stats = `Unique: ${unique.length}`)
}

const brokenLinks = array => {
  const broken = array.filter(link => (link.ok = 'fail' && link.status > =400))
  return (stats = `Broken: ${broken.length}`)
}
console.log(
  brokenLinks([
    {
      href: 'https://medium.freecodecamp.org/what-exactly-is-node-js-ae36e97449f5',
      text: 'What exactly is Node.js? - freeCodeCamp',
      file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\README2.md',
      status: 200,
      ok: 'ok',
    },
    {
      href: 'https://www.drauta.com/que-es-nodejs-y-a-que-sirve',
      text: '¿Qué es Node.js y para qué sirve? - drauta.com',
      file: 'C:\\Users\\Ysis\\Documents\\Laboratoria\\DEV003-md-links\\README2.md',
      status: 404,
      ok: 'fail',
    },
  ])
)

// const option = process.argv.slice(2)
// console.log(option)
// mdLinks('README2.md', { validate: true })
//   .then(res => {
//     console.log(res)
//   })
//   .catch(error => {
//     console.log(error)
//   })
