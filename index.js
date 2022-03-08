import Cropper from './cropper.esm.js';

const image = document.getElementById('image');
const cropper = new Cropper(image, {
    // aspectRatio: 16 / 9,
    viewMode: 1,
    crop(event) {
        if (!window.log) {
            return;
        }
        console.log(event.detail.x);
        console.log(event.detail.y);
        console.log(event.detail.width);
        console.log(event.detail.height);
        // console.log(event.detail.rotate);
        // console.log(event.detail.scaleX);
        // console.log(event.detail.scaleY);
    },
});
