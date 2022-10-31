

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


F.oninput = () => {
    background(0);
    newfunc = document.getElementById("F").value;
    switch (newfunc) {
        case "1 a i":
            xfunc = (x, y) => 2 * x;
            yfunc = (x, y) => 2 * y;
            break;
        case "1 a ii":
            xfunc = (x, y) => 2 * x;
            yfunc = (x, y) => -2 * y;
            break;
        case "1 b i":
            xfunc = (x, y) => 0;
            yfunc = (x, y) => -1;
            break;
        case "1 b ii":
            xfunc = (x, y) => -x;
            yfunc = (x, y) => y * y;
            break;
        case "1 b iii":
            xfunc = (x, y) => -y;
            yfunc = (x, y) => x;
            break;
        case "Justin Beispiel":
            xfunc = (x, y) => 0;
            yfunc = (x, y) => Math.max(0, 1 - x * x);
            break;
    }
}

