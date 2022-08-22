function f(v, t) {
    //return new Vector(v.y, -sin(v.x));
    //return new Vector(v.y, -v.x);
    //return new Vector(-2 * 1 * v.y, v.x * v.x + v.y * v.y);
}


const zoom = 1.2;
const hist = 50;
let sys;
let N = +document.getElementById("nparticles").value;
let x0 = +document.getElementById("xmin").value, x1 = +document.getElementById("xmax").value;
let y0 = +document.getElementById("ymin").value, y1 = +document.getElementById("ymax").value;
let dt = +document.getElementById("timestep").value
let xfunc = (x, y) => y, yfunc = (x, y) => -sin(x);

function f(v, t) {
    return new Vector(xfunc(v.x, v.y), yfunc(v.x, v.y));
}

//let button;

function setup() {
    console.log(x0, x1, y0, y1);
    createCanvas(windowWidth - 170, 1 * windowHeight - 0 * 70).position(170, 0 * 70);
    background(0);
    frameRate(30);
    strokeWeight(2);
    colorMode(RGB, 255, 255, 255, 1);
    sys = new System(x0, 5, -3, 3, N, hist);
    sys.stepPoints(dt, 100);
    //button = createButton('Run simulation');
    //button.position(10, 550);
    //button.mousePressed(restartSim);
}

function draw() {
    sys.drawStepLines(dt, 1);
    //x0 = +document.getElementById("xmin").value, x1 = +document.getElementById("xmax").value;
    //y0 = +document.getElementById("ymin").value, y1 = +document.getElementById("ymax").value;
    //console.log(x0, x1, y0, y1);

}


function restartSim() {
    background(0);
    for (let i = 0; i < sys.N; i++) {
        sys.points[i].restart();
    }
    sys.t = 0;
}

function windowResized() {
    resizeCanvas(windowWidth - 170, 1 * windowHeight, false);
    background(0);
}