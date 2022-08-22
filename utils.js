

xmin.oninput = () => {
    background(0);
    x0 = +document.getElementById("xmin").value;
    sys = new System(x0, x1, y0, y1, N, hist);
    sys.stepPoints(dt, 100);
}

xmax.oninput = () => {
    background(0);
    x1 = +document.getElementById("xmax").value;
    sys = new System(x0, x1, y0, y1, N, hist);
    sys.stepPoints(dt, 100);
}

ymin.oninput = () => {
    background(0);
    y0 = +document.getElementById("ymin").value;
    sys = new System(x0, x1, y0, y1, N, hist);
    sys.stepPoints(dt, 100);
}

ymax.oninput = () => {
    background(0);
    y1 = +document.getElementById("ymax").value;
    sys = new System(x0, x1, y0, y1, N, hist);
    sys.stepPoints(dt, 100);
}

timestep.oninput = () => {
    dt = +document.getElementById("timestep").value;
}

nparticles.oninput = () => {
    background(0);
    N = +document.getElementById("nparticles").value;
    if (N > 30) {
        sys = new System(x0, x1, y0, y1, N, hist, "euler");
    }
    else {
        sys = new System(x0, x1, y0, y1, N, hist, "RK4");
    }
    sys.stepPoints(dt, 100);
}


fx.oninput = () => {
    background(0);
    newfunc = document.getElementById("fx").value;
    switch (newfunc) {
        case "linearPendulum" || "realPendulum" || "vdP" || "Duffing":
            xfunc = (x, y) => y;
            break;
        case "quadraticNewton":
            xfunc = (x, y) => 0.5 * x * (0.5 / (x * x + y * y + 0.1) - 1);
            break;
        case "cubicNewton":
            xfunc = (x, y) => {
                let r2 = x * x + y * y + 0.1;
                return -(x * x - y * y) / (r2 * r2) - x;
            }
    }
}

fy.oninput = () => {
    background(0);
    newfunc = document.getElementById("fy").value;
    switch (newfunc) {
        case "linearPendulum":
            yfunc = (x, y) => -x;
            break;
        case "realPendulum":
            yfunc = (x, y) => -sin(x);
            break;
        case "vdP":
            yfunc = (x, y) => -x + (1 - x * x) * y;
            break;
        case "Duffing":
            yfunc = (x, y) => -x + x * x * x / 6;
            break;
        case "quadraticNewton":
            yfunc = (x, y) => -0.5 * y * (0.5 / (x * x + y * y + 0.1) + 1);
            break;
        case "cubicNewton":
            yfunc = (x, y) => {
                let r2 = x * x + y * y + 0.1;
                return 2 * x * y / (r2 * r2) - y;
            }
    }
}

