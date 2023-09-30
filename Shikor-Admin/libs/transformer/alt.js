/** @type {typeof import('fs')} */
let fs
/** @type {string} */
let srcCode
/** @type {string} */
let fileName

fs = require('fs')
fileName = '../../pages/services/digital-marketing/index.tsx'
srcCode = /* html */ `
<img src='' alt='rosetech-explore-image-2' />
<img src='' alt='sEr-explore-sSd-2' />
<img src='' alt='sEr-explore sSd-2' />
`
srcCode = fs.readFileSync(fileName, { encoding: 'utf8' })
;(srcCode.match(/alt='(?:(\w+[-])*\w*)'/gm) || []).forEach(from => {
  const to = from.toLowerCase().replace(/-/gm, ' ')
  console.log('From:', from, ', to:', to)
  srcCode = srcCode.replace(from, to)
})
fs.writeFileSync(fileName + '.tsx', srcCode, { encoding: 'utf8' })
