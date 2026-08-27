import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'

const __dir = import.meta.dirname
console.log(__dir)
const PORT = 8000

const server = new http.createServer(async (req, res) =>
{
    serveStatic(req, res, __dir)
})

server.listen(PORT,()=>console.log(`The server is working on port: ${PORT}`))
