const request = require('request');



const geocoding = (address, callBack) =>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?types=address&access_token=pk.eyJ1IjoibWFtbzEyMzAxMjMiLCJhIjoiY2xrNnB0Y2YxMDE0czNlcHI0a3lhZno5aSJ9.8h9BL0mgC-0P3MGRUWzxJQ`;
    request({url, json: true}, (error, {body})=> {
        if (error) {
            callBack('unable to connect to location services!', undefined)
        }else if(body.features.length === 0){
            callBack('unable to find location. Try another search.', '')
        }else{
            callBack(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name,
                
            })
        }
    })
}


module.exports = geocoding