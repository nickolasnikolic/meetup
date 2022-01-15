window.onload = () => {
//Create a Pixi Application
const app = new PIXI.Application({ 
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: true, // default: false
    resolution: 1       // default: 1
  }
);
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoDensity = true;
app.resizeTo = window;

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

};