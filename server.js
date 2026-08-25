import http from 'node:http'

const PORT = 8000
const server = new http.createServer(() =>
{
    res.statusCode=200
    res.setHeader("Content-Type", "text/html")
    res.end(`<html><h1>The server is working.</h1></html>`)
})

server.listen(PORT,()=>console.log(`The server is working on port: ${PORT}`))
