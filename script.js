import defaultColorsArray from './data.js'

let html = ''
let optionsHTML = ''

function generateDefaultArray() {
    defaultColorsArray.forEach((data) => {
        html += `<div class="panel">
        <div class="color-block" style="background-color:${data.hex};"></div>
        <p class="color-hex">#${data.hex}</p></div>`

        optionsHTML += `<option value="${data.name}">${data.name}</option>`
    }
    )

}
function renderDefaultColors() {
    document.getElementById('color-panels').innerHTML = html
    document.getElementById('color-select').innerHTML = optionsHTML
}

document.getElementById('color-form').addEventListener('submit', (e) => {
    e.preventDefault()

    const acutalColor = document.getElementById('color-picker').value.replace('#', '')

    fetch(`https://www.thecolorapi.com/id?hex=${acutalColor}`, { method: "GET" })
        .then(response => response.json())
        .then(color => {
            document.getElementById('color-select').innerHTML += `<option value="${color.name.value}">${color.name.value}</option>`

            defaultColorsArray.pop()
            setTimeout(() => {
                defaultColorsArray.unshift({name: `${color.name.value}`, hex: `#${acutalColor}`})
                html = ''
                optionsHTML = ''
                generateDefaultArray()
                renderDefaultColors()
            }, 100)
        })
    navigator.clipboard.writeText(acutalColor)
})

generateDefaultArray()
renderDefaultColors()
