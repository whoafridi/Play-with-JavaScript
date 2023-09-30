const path = require('path')
const fs = require('fs')

const defaultConfigFile = `module.exports = {}`

const copyConfig = (/** @type {fs.PathLike} */ filePath) => {
  const libDir = path.join(__dirname, '..')

  if (!fs.existsSync(libDir)) fs.mkdirSync(libDir, { recursive: true })

  if (fs.existsSync(filePath))
    fs.copyFileSync(filePath, `${libDir}/export-images.config.js`)
  else
    fs.writeFileSync(
      `${libDir}/export-images.config.js`,
      defaultConfigFile,
      'utf-8'
    )
}

module.exports = copyConfig
