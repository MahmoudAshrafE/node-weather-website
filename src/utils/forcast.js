const request = require('request');




const forcast = (width, height, callBack) =>{
    const url = `http://api.weatherstack.com/current?access_key=1a3b93bbe5f0d06880860888315ddf4f&query=${width},${height}`;
    request({url, json: true}, (error, {body})=> {
        if (error) {
            callBack('unable', undefined)
        // }else if()
        }else{
            callBack(undefined, `It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out `)
        }
    })
}


module.exports = forcast