const { mdLinks } = require('./index')
const Color = require('colors')
// const color = Color('rgb(255, 255, 255)')

// console.log('Hello World'.green)
console.log(process.argv)
if (process.argv.includes('--validate'))
  // import mdLinks from "./index.js";
  mdLinks('README2.md', { validate: true })
    .then(res => {
      res
    })
    .catch(error => {
      console.log(error)
    })
