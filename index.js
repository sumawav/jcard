import Cropper from './cropper.esm.js';

const URL = window.URL || window.webkitURL;
const REGEXP_MIME_TYPE_IMAGES = /^image\/\w+$/;
const REGEXP_URLS = /^(?:https?|data):/;

const fileInput = document.getElementById('file');

function showEditor() {
    document.getElementById('loader').style.display = 'none';
    document.getElementById('editor').style.display = 'block';
}

function showLoader() {
    document.getElementById('loader').style.display = 'table';
    document.getElementById('editor').style.display = 'none';
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

function startCropper() {
    console.log('inside startCropper');
    const image = document.getElementById('image');
    console.log(image);
    const cropper = new Cropper(image, {
        autoCrop: false,
        dragMode: 'move',
        background: false,

        ready: () => {
            console.log('cropper started!');
            // if (this.croppedData) {
            //     this.cropper
            //         .crop()
            //         .setData(this.croppedData)
            //         .setCanvasData(this.canvasData)
            //         .setCropBoxData(this.cropBoxData);
            //     this.croppedData = null;
            //     this.canvasData = null;
            //     this.cropBoxData = null;
            // }
        },

        crop: ({ detail }) => {
            // if (detail.width > 0 && detail.height > 0 && !data.cropping) {
            //     this.update({
            //         cropping: true,
            //     });
            // }
            console.log(detail);
        },
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
                document.getElementById('image').src = data.url;
                console.log('attempting to start cropper');
                startCropper();
            })
            .catch((e) => {
                target.value = '';
                this.alert(e);
            });
    }
};
