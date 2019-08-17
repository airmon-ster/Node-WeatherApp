console.log('clientside js file is loaded')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')




weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = ''
    messageTwo.textContent = ''

    const location = search.value

    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
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