#!/usr/bin/env node
const { mdLinks } = require('./index')
const Colors = require('colors')
const { log } = console
Colors.setTheme({
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red',
})
// const { process } = require('process')

//Total de links
const totalLinks = array => `Total: ${array.length}`

//links unicos
const uniqueLink = array => {
  const unique = [...new Set(array.map(link => link.href))]
  return `Unique: ${unique.length}`
}

//links broken
const brokenLinks = array => {
  const broken = array.filter(link => (link.ok = 'fail' && link.status >= 400))
  return `Broken: ${broken.length}`
}

const msnHelp = () => {
  log('Welcome to md-links'.bgBlue)
  log(Colors.help(`need some help ?, ...Try:\n`))
  log(Colors.help('--validate (or --v)               -->  shows an array with links and status \n'))
  log(Colors.help('--stats (or --s)                  -->  total and unique links \n '))
  log(Colors.help('--validate --stats (or --v --s)   -->  total , unique and broken links \n'))
  log(Colors.help('--help (or --h)                   -->  you are here \n'))
  log(Colors.warn('Commands are written in lower case \n'))
}
const option = process.argv.slice(2)
const path = process.argv[2]

const validate = option.includes('--validate') || option.includes('--v')
const stats = option.includes('--stats') || option.includes('--s')
const help = option.includes('--help') || option.includes('--h')

mdLinks(path, { validate })
  .then(resolve => {
    // console.log(resolve)
    const links = resolve
    if (validate && stats) {
      console.log(`${totalLinks(links)}`.blue)
      console.log(`${uniqueLink(links)}`.blue)
      console.log(`${brokenLinks(links)}`.red)
    } else if (validate) {
      // console.log('entro')
      console.log(links.flat())
    } else if (stats) {
      console.log(`${totalLinks(links)}`.blue)
      console.log(`${uniqueLink(links)}`.blue)
    } else if (help) {
      console.log(msnHelp())
    } else {
      console.log('Welcome to md-links'.bgGreen)
      console.log(
        'This are the links that throws your route, if you want to know the statistics of totals you can try with --stats o --validate'
          .italic
      )
      console.log(links)
    }
  })
  .catch(error => {
    console.log(error)
  })
