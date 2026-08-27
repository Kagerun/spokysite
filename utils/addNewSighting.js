import { getData } from "./getData.js";
import path from 'node:path'
import fs from 'node:fs/promises'
import { sanitizeContent } from "./sanitizeContent.js";
export async function addNewSighting(newSighting) {
    try{
        const pathToJSON = path.join('data', 'data.json')
        const sightings = await getData()
        sightings.push(newSighting)
        await fs.writeFile(pathToJSON, JSON.stringify(sightings, null, 2), 'utf8')
    }catch(err){
        throw new Error(err)
    }
}