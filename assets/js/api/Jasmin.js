var fileTag = document.getElementById("filetag"),
    preview = document.getElementById("preview");

function debug() {
if (fileTag != null) {
    fileTag.addEventListener("change", function () {
        edit(this);
    });
}
}


//Get photo URL with Storage Firebase
function edit(input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            preview.setAttribute('src', e.target.result);
            document.getElementById("hide").style.display = "inline";
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
                document.getElementById("input-photo-url").value = downloadURL;
            });
        });
    }
}

async function createPackage() {
    var itemKey = document.getElementById('itemKey').value;
    var description = document.getElementById('description').value;
    var summary = `NrParticipantes: ${document.getElementById('autorizacao').value} | EntidadesAutorização: ${document.getElementById('participacao').value} | EntidadesParticipação: ${document.getElementById('tipoEvento').value}`
    var image = document.getElementById('input-photo-url').value;

    await fetch("https://environ-back.herokuapp.com/package/create", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            itemKey: itemKey,
            description: description,
            summary: summary,
            image: image
        })
    }).then(response => {
        return response.json();
    }).then(result => {
        location = location;
    })
}

//getPackages
function getPackages() {
    fetch('https://environ-back.herokuapp.com/package/all', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        return response.json();
    }).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
}