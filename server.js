import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet, handlePost, handleNews } from './handlers/routeHandlers.js'

const __dir = import.meta.dirname
console.log(__dir)
const PORT = 8000

const server = new http.createServer(async (req, res) =>
{
    if(req.url === "/api"){
        if (req.method === 'GET'){
            await handleGet(res)
        }else if (req.method === 'POST'){
            await handlePost(req, res)
        }
    }
    else if(req.url === "/api/news"){
        return await handleNews(req, res)
    }
    else if(!req.url.startsWith("/api")){
        serveStatic(req, res, __dir)
    }
})

server.listen(PORT,()=>console.log(`The server is working on port: ${PORT}`))
