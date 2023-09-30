/** @type {typeof import('path')} */
let path
/** @type {typeof import('fs')} */
let fs
/** @type {string} */
let srcCode
/** @type {string} */
let fileName
/** @type {string[]} */
let imports

path = require('path')
fs = require('fs')
imports = ['import ExportableImage from "../../components/ExportableImage"']
fileName = '../../pages/blog/details.tsx'
srcCode = /* html */ `
<img src='/a/b/c' alt='rosetech-explore-image-2' />

<img src='abv' alt='rosetech-explore-image-2' />
<img src='../sdsd/.jpg' alt='rosetech-explore-image-2' />
<img src='/a/b/c/' alt='rosetech-explore-image-2' />
<img
  loading='lazy'
  placeholder='blur'
  className='img-fluid ps-5'
  src='/assets/images/contact-banner.svg'
  alt='rosetech contact banner image'
/>
`
srcCode = fs.readFileSync(fileName, { encoding: 'utf8' })
;(srcCode.match(/src='(\w|[/. ()-_])*?'/gm) || []).forEach(from => {
  const filePath = from.replace("src='", '').substring(0, from.length - 1)

  let to = path.basename(filePath)
  to = to.substring(0, to.lastIndexOf('.')) || to
  to = to
    .toLowerCase()
    .replace(/[()]+/gm, '')
    .replace(/[-_()]+/gm, ' ')
    .split(/[ ]+/gm)
    .map(s => s.charAt(0).toUpperCase() + s.slice(1))
    .join('')

  const impo = `import ${to} from '${filePath.replace(
    '../assets',
    '../../public/assets'
  )}`
  imports.push(impo)

  to = `src={${to}}`
  console.log(
    'From:',
    from,
    'FilePath:',
    filePath,
    'Import:',
    impo,
    ', To:',
    to
  )

  srcCode = srcCode.replace(from, to)
})
;(srcCode.match(/<img/gm) || []).forEach(from => {
  const to = '<ExportableImage'
  console.log('From:', from, ', to:', to)
  srcCode = srcCode.replace(from, to)
})
;(srcCode.match(/<\/img/gm) || []).forEach(from => {
  const to = '</ExportableImage'
  console.log('From:', from, ', to:', to)
  srcCode = srcCode.replace(from, to)
})
fs.writeFileSync(
  fileName + '.tsx',
  `${imports.join(`
`)}

${srcCode}
`,
  { encoding: 'utf8' }
)
