'use strict'
const zlib = require('zlib')
const fs = require('fs')

module.exports = socket => response => {
	response.headers.push(['Content-Type', response.mimetype], ['Content-Encoding', 'gzip'])
	socket.writeHead(response.status, response.headers)
	const compressed = zlib.createGzip()
	if (response.data.constructor === fs.ReadStream)
		response.data.pipe(compressed)
	else
		compressed.end(Buffer.from(response.data))
	compressed.pipe(socket)
}
