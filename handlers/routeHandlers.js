import { getData } from "../utils/getData.js"
import { sendResponse } from "../utils/sendResponse.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { addNewSighting } from "../utils/addNewSighting.js"
import { sanitizeContent } from "../utils/sanitizeContent.js"
import { sightingEvents } from "../events/sightingEvents.js"
import { stories } from "../data/stories.js"

export async function handleGet(res){
    const data = await getData()
    const content = JSON.stringify(data)
    sendResponse(res, 200, 'application/json', content)
}

export async function handlePost(req, res){
    try{
        const parsedBody = await parseJSONBody(req)
        const sanitizedBody = sanitizeContent(parsedBody)
        await addNewSighting(sanitizedBody)
        sendResponse(res, 201, "application/json", JSON.stringify(sanitizedBody))
        sightingEvents.emit('sighting-added', sanitizedBody)
    }catch(err){
        console.log(err)
        sendResponse(res, 400, "application/json", JSON.stringify({error: err}))
    }
    
}

export function handleNews(req, res){
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Cache-Control', 'no-cache')
    setInterval(()=>{
        let randomIndex = Math.floor(Math.random() * stories.length)
        res.write(`data: ${JSON.stringify({
            event: 'randomStory',
            story: stories[randomIndex]
        })}\n\n`)
    },3000)
}