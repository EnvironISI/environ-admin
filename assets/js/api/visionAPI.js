var fileTagPacote = document.getElementById("filetagPacote"),
    helo = document.getElementById("visualizar");

function changePreview() {
    if (fileTagPacote != null) {
        fileTagPacote.addEventListener("change", function () {
            editPhoto(this);
        });
    }
}


//Get photo URL with Storage Firebase
function editPhoto(input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            helo.setAttribute('src', e.target.result);
            document.getElementById("escondido").style.display = "inline";
        }
        reader.readAsDataURL(input.files[0]);
        var storage = firebase.storage();
        var storageRef = storage.ref();
        // File or Blob named mountains.jpg
        var file = input.files[0];
        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
                console.log(downloadURL)
                document.getElementById("imageUrl").value = downloadURL;
                console.log(document.getElementById("imageUrl").value)
            });
        });
    }
}

//Mandar verificação por email
async function reqNumber() {
    var url = document.getElementById('imageUrl').value;
    var suposto = document.getElementById('numColaboradoresSuposto').value;
    var numberFaces;
    await fetch("https://environ-back.herokuapp.com/event/nrcolaboradores", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                url_faces: url,
            })
        })
        .then(result => {
            return result.json();
        }).then(data => {
            console.log(data.faces);
            numberFaces = data.faces;
            document.getElementById("numColaboradores").value = data.faces;
        }).catch(error => {
            console.log(error)
        })
        if(numberFaces >= suposto) {
            document.getElementById("naopassou").style.display = "inline";
        } else {
            document.getElementById("passou").style.display = "inline";
        }
}
//Transformar imagem
async function reqVerification() {
    var url = document.getElementById('imageUrl').value;
    reqNumber()
    await fetch("https://environ-back.herokuapp.com/event/colaboradores", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                url_faces: url,
            })
        })
        .then(response => response.blob())
        .then(blob => {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                var base64data = reader.result;
                document.getElementById("visualizar").src = base64data;
            }
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement('a');
            a.href = url;
            a.download = "colaboradores.png";
            document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click();
            a.remove(); //afterwards we remove the element again
        }).catch(error => {
            console.log(error)
        })
}
