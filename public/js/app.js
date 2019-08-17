const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#messageOne')
const messageTwo = document.querySelector('#messageTwo')

const inputFilter = (searchTerm, callback) => {
    if (/^[a-z\d\s]+$/i.test(searchTerm)) {
        callback(undefined, searchTerm)
    } else {
        callback('There was an error in the input provided', undefined)
    }
}


weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    messageOne.textContent = ''
    messageTwo.textContent = ''

    
    const location = search.value

    inputFilter(location, (error, response) => {
        if (error){
            messageTwo.textContent = 'Invalid Input'
        } else {

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

        }
    })



})