console.log('hello from js');




const weatherSearch = document.querySelector('form')
const search = document.querySelector('.search')
const button = document.querySelector('.button')

const message__1 = document.querySelector('.message__1')
const message__2 = document.querySelector('.message__2')

message__1.textContent = `loading...`;
message__2.textContent = ``;

const fetchData = () => {

    const location = search.value 

    const url = `/weather?address=${location}`

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                message__1.textContent = data.error;
            }else{
                message__1.textContent = `in: ${data.location}`;
                message__2.textContent = `The weather currently: ${data.forecast}`;
            }
        
        })
        })
}
button.addEventListener('click',() => {
    fetchData()
})

weatherSearch.addEventListener('submit', (e) => {
    e.preventDefault()
    fetchData()
})
