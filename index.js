import Cropper from './cropper.esm.js';

const URL = window.URL || window.webkitURL;
const REGEXP_MIME_TYPE_IMAGES = /^image\/\w+$/;
const REGEXP_URLS = /^(?:https?|data):/;

const fileInput = document.getElementById('file');

function showEditor() {
    document.getElementById('editor').style.display = 'block';
}

function read(file, event) {
    return new Promise((resolve, reject) => {
        if (!file) {
            resolve();
            return;
        }

        if (REGEXP_MIME_TYPE_IMAGES.test(file.type)) {
            if (URL) {
                resolve({
                    loaded: true,
                    name: file.name,
                    type: file.type,
                    url: URL.createObjectURL(file),
                });
            } else {
                reject(new Error('Your browser is not supported.'));
            }
        } else {
            reject(
                new Error(
                    `Please ${event ? event.type : 'choose'} an image file.`
                )
            );
        }
    });
}

fileInput.onchange = ({ target }) => {
    const { files } = target;

    if (files && files.length > 0) {
        read(files[0])
            .then((data) => {
                target.value = '';
                console.log('successful read');
                console.log(data);
                // this.update(data);
                showEditor();
            })
            .catch((e) => {
                target.value = '';
                this.alert(e);
            });
    }
};
