var img;
let gFile;

//code from Max Wallace https://stackoverflow.com/questions/22087076/how-to-make-a-simple-image-upload-using-javascript-html
//it loads an image selected by the computer into browser--I was unable to implement this feature into my final project, though

function previewFile(){
    var preview = document.querySelector('img'); //selects the query named img
    var file    = document.querySelector('input[type=file]').files[0]; //sames as here
    var reader  = new FileReader();

    reader.onloadend = function () {
        preview.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
    } else {
        preview.src = "";
    }
    console.log(file.name)
    gFile = file

}

function setup() {
  previewFile()
}
