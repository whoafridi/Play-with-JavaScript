/** @type {typeof import('path')} */
let path
/** @type {typeof import('fs')} */
let fs
/** @type {string} */
let srcCode
/** @type {{from?: string; filePath?: string; relPath?: string}[]} */
let out
/** @type {string[]} */
let fileNames
let occurrence

path = require('path')
fs = require('fs')
out = []
occurrence = {}

readFilesRecursive(path.join(__dirname, '../../assets/images/'))
  .filter(f => f.endsWith('.svg') || f.endsWith('.png'))
  .map(f => ("'" + f.substring(f.indexOf('assets')) + "'").replace(/\\/gm, '/'))
  .forEach(f => (occurrence[f] = 0))

/**
 * @param {string} dir
 * @param {string[]} files */
function readFilesRecursive(dir, files = []) {
  fs.readdirSync(dir).forEach(function(file) {
    const f = path.join(dir, path.sep, file)
    if (fs.statSync(f).isDirectory()) files = readFilesRecursive(f, files)
    else files.push(f)
  })

  return files
}

fileNames = readFilesRecursive(path.join(__dirname, '../../pages/'))
  .filter(f => f.endsWith('.tsx'))
  .concat(
    readFilesRecursive(path.join(__dirname, '../../components/')).filter(f =>
      f.endsWith('.tsx')
    )
  )
srcCode = /* ts */ `
import a from './sdasd/s.svg'
`
srcCode = fileNames
  .map(f => fs.readFileSync(f, { encoding: 'utf8' }))
  .join('\n')
;(
  srcCode.match(/import \w+ from '\.(\w|[/. ()-_])*?\.\w{3}'$/gm) || []
).forEach(from => {
  const filePath = from.substring(from.indexOf(' from ')).replace(' from ', '')
  const relPath = "'" + filePath.substring(filePath.indexOf('assets'))

  occurrence[relPath] =
    typeof occurrence[relPath] !== 'undefined' ? occurrence[relPath] + 1 : 1

  out.push({ from, filePath, relPath })
})
;(srcCode.match(/src='(\w|[/. ()-_])*?'/gm) || []).forEach(from => {
  const relPath = "'" + from.substring(from.indexOf('assets'))

  occurrence[relPath] =
    typeof occurrence[relPath] !== 'undefined' ? occurrence[relPath] + 1 : 1

  out.push({ from, relPath })
})

out.push(occurrence)

fs.writeFileSync(
  path.join(__dirname, 'assets.json'),
  JSON.stringify(out, null, 2),
  {
    encoding: 'utf8'
  }
)

/** 
// js
console.log(
  Object.entries(ass[ass.length - 1])
    .map(([key, val]) => (val === 0 ? key : undefined))
    .filter(v => v)
);

Output;
[
  "'assets/images/address.svg'",
  "'assets/images/bg.svg'",
  "'assets/images/countries.svg'",
  "'assets/images/digital-advertising 1.svg'",
  "'assets/images/digital-advertising 2.svg'",
  "'assets/images/digital-advertising 3.svg'",
  "'assets/images/featured-blog-1.svg'",
  "'assets/images/featured-blog-3.svg'",
  "'assets/images/Frame (2).svg'",
  "'assets/images/Group (1).svg'",
  "'assets/images/Group (10).svg'",
  "'assets/images/Group (11).svg'",
  "'assets/images/Group (13).svg'",
  "'assets/images/Group (15).svg'",
  "'assets/images/Group (2).svg'",
  "'assets/images/Group (3).svg'",
  "'assets/images/Group (4).svg'",
  "'assets/images/Group (6).svg'",
  "'assets/images/Group (8).svg'",
  "'assets/images/hero-img.png'",
  "'assets/images/logo-rosetech.png'",
  "'assets/images/mail.svg'",
  "'assets/images/mission-statement.svg'",
  "'assets/images/phone.svg'",
  "'assets/images/rectangle.svg'",
  "'assets/images/supply-chain.svg'",
  "'assets/images/Vector (1).svg'",
  "'assets/images/Vector.svg'",
  "'assets/images/work.svg'"
]
// !js
*/
