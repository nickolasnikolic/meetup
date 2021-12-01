window.onload = () => {
const t = document.getElementById('image-container');
t.setAttribute('viewBox', '0,0,300,300')
const c = document.getElementById('js-changed');
let offsetX = 0;
const timeInMilliseconds = 2000;
const i = setInterval(() => {
    c.setAttribute('cx' ,offsetX++);
    
    if( offsetX >= 100 ){
        clearInterval(i);
    }
}, timeInMilliseconds / 60);

};