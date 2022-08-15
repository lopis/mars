const fs = require('fs')
const archiver = require('archiver')

let output = fs.createWriteStream('./dist/build.zip')
let archive = archiver('zip', {
  zlib: { level: 9 } // set compression to best
})

const MAX = 13 * 1024 // 13kb

output.on('close', function () {
  const bytes = archive.pointer()
  const kilobytes = Math.ceil((10 * bytes / 1024)) / 10
  const percent = (bytes / MAX * 100).toFixed(2)
  if (bytes > MAX) {
    console.error(`Game size overflow: ${kilobytes}KB (${percent}%)`)
  } else {
    console.log(`Game size: ${kilobytes}KB (${percent}%)`)
  }
})

archive.on('warning', function (err) {
  if (err.code === 'ENOENT') {
    console.warn(err)
  } else {
    throw err
  }
})

archive.on('error', function (err) {
  throw err
})

archive.pipe(output)
archive.append(fs.createReadStream('./dist/index.html'), { name: 'index.html' })
archive.append(fs.createReadStream('./dist/index.js'), { name: 'index.js' })
// fs.unlinkSync('./dist/index.html')
// fs.unlinkSync('./dist/index.js')
// fs.unlinkSync('./dist/main.css')

archive.finalize()
