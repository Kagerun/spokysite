import sanitizeHtml from "sanitize-html";

export function sanitizeContent(data){
    const sanitazedData = {}
    for (const [key, value] of Object.entries(data)){
        if (typeof value === 'string'){
            sanitazedData[key] = sanitizeHtml(value, {allowedTags:['b'],allowedAttributes:{}})
        }else{
            sanitazedData[key]=value
        }
    }
    return sanitazedData
}