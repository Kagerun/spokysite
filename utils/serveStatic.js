import path from 'node:path'
import fs from 'fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, dir){
    const publicDirPath = path.join(dir,"public")
    const pathToReq = path.join(publicDirPath,  req.url === "/"? "index.html":req.url)
    const ext = path.extname(pathToReq)
    const ContentType = getContentType(ext)
    try{
        const content = await fs.readFile(pathToReq)
        sendResponse(res, 200, ContentType, content)
    }catch(err){
        if (err.code === 'ENOENT'){
            const pathTo404 = path.join(publicDirPath, "404.html")
            const content = await fs.readFile(pathTo404)
            sendResponse(res, 200, "text/html", content)
        }else{
            sendResponse(res, 500, "text/html", `<html><h1>Server Error: ${err.code}</h1></html>`)
        }
    }
}