import fs from 'node:fs/promises'
import path from 'node:path'

export  async function getData(){
    try{
        const dataPath = path.join("data", "data.json")
        const content = await fs.readFile(dataPath, 'utf8')
        const parsedData = JSON.parse(content)
        return parsedData
    }catch(err){
        console.log(err)
        return []
    }
}