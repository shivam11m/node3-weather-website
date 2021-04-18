console.log("client side javascript file is loaded")

const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const messageone = document.querySelector('#message-one')
const messagetwo = document.querySelector('#message-two')

// messagetwo.textContent = "From javascript"


weatherform.addEventListener('submit',(e)=>{
    e.preventDefault()

    messageone.textContent="Loading..."
    messagetwo.textContent=""
    
    const location = search.value
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messageone.textContent=data.error
            //console.log(data.error)
        }
        else{
            messageone.textContent = data.location
            messagetwo.textContent = data.forecast

            console.log(data.location)
            console.log(data.forecast)
        }
    })

})

})