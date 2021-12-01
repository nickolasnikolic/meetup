window.onload = () => {
const time = new Date();
const c = document.getElementById('js-changed');
const timeInMilliseconds = 30;
const offset = 500;
let x, y;
// run continuously every 30 ms
function animate(){
    // get the sine and cosine values of time
    x = Math.sin(new Date().getTime() / 1000) * 100 + offset;
    y = Math.cos(new Date().getTime() / 1000) * 100 + offset;
    // set the x,y to those values
    c.setAttribute('cx' , x);
    c.setAttribute('cy' , y);
    requestAnimationFrame(animate);
};
animate();

};