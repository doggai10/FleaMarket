function previewImage(f) {
    var file = f.files;
    console.log(file[0].name);
    var selectedFile = file[0];
    var imageName = file[0].name;
    sessionStorage.setItem('imageName', imageName);
    var storageRef = firebase.storage().ref();
    storageRef
        .child(`images/${imageName}`)
        .put(selectedFile)
        .on('state_changed', snapshot => {
            console.log(snapshot)
        }, error => {
            console.log(error);
        }, () => {
            console.log('file upload success');
        });

}