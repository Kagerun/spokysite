import { getData } from "../utils/getData.js"
import { sendResponse } from "../utils/sendResponse.js"
import { parseJSONBody } from "../utils/parseJSONBody.js"
import { addNewSighting } from "../utils/addNewSighting.js"
import { sanitizeContent } from "../utils/sanitizeContent.js"
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
    }catch(err){
        console.log(err)
        sendResponse(res, 400, "application/json", JSON.stringify({error: err}))
    }
    
}