const imagePickerElement = document.querySelector('#image-upload-control input')

const imagePreviewElement = document.querySelector('#image-upload-control img')

function updateImagePreview(){

    const files = imagePickerElement.files
    console.log(files)

    if(!files || files.length === 0){
        imagePreviewElement.style.display = 'none' 
        return
    }

    const pictureFile = files[0]
    imagePreviewElement.src = URL.createObjectURL(pictureFile)
    imagePreviewElement.style.display = 'block' 
}

imagePickerElement.addEventListener('change',updateImagePreview)

