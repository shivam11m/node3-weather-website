const request=require('request')

const forecast=( lat,log,  callback) =>{
    const url= 'http://api.weatherstack.com/current?access_key=842b62d73bffc36202d600de901eaad6&query='+ lat + ','+ log  + '&units=m'
    
    //request({url:url, json:true}, (error, response) => { es-6 property on url
    request({url, json:true}, (error, {body}) => {

        if(error){
            callback("Unable to connect",undefined)
            }
        else if(body.error){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined ,"Mostly cloudy until evening and breezy throughtout the day, It is "+body.current.temperature+ " degrees out. It feelslike "+
            body.current.feelslike)
        }
    })
}


module.exports=forecast