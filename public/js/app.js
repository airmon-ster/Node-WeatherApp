console.log('clientside js file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

const sanitize =  (a) => {
    var b = "";
    for (var i = 0; i < a.length; i++) {
      b += "&#x"+a.charCodeAt(i).toString(16)+";"
    }
    return b;
  }


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = ''
    messageTwo.textContent = ''

    const location = sanitize(search.value)

    messageOne.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error){
            messageOne.textContent = 'There was an error.'
        } else {
            messageOne.textContent = data.location
            messageTwo.textContent = data.forecast
        }
        
    })
})
})