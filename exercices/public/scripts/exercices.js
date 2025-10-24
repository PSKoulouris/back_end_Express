async function returnData() {
    let fileData
        fileData = await fetch("/data.txt")
        const text = await fileData.text()
        document.getElementById("exercices").innerHTML = text
    }   

const button = document.querySelector("button")
button.addEventListener("click", returnData)