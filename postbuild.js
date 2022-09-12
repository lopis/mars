const fs = require('fs')
const archiver = require('archiver')

let output = fs.createWriteStream('./public.zip')
let archive = archiver('zip', {
  zlib: { level: 9 } // set compression to best
})

const MAX = 13 * 1024 // 13kb

output.on('close', function () {
  const bytes = archive.pointer()
  const kilobytes = Math.floor(bytes / 1024)
  const bytesLeft = bytes % 1024
  const percent = (bytes / MAX * 100).toFixed(2)
  if (bytes > MAX) {
    console.error(`Game size overflow: ${kilobytes}KB and ${bytesLeft}B (${percent}%)`)
  } else {
    console.log(`Game size: ${Math.floor(100 * bytes / 1024) / 100}KB (${percent}%)`)
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
archive.append(fs.createReadStream('./public/index.html'), { name: 'index.html' })
archive.append(fs.createReadStream('./public/server.js'), { name: 'server.js' })
archive.append(fs.createReadStream('./public/shared.js'), { name: 'shared.js' })
archive.append(fs.createReadStream('./public/client.js'), { name: 'client.js' })
archive.append(fs.createReadStream('./public/manifest.json'), { name: 'manifest.json' })
// fs.unlinkSync('./dist/index.html')
// fs.unlinkSync('./dist/index.js')
// fs.unlinkSync('./dist/main.css')

archive.finalize()
