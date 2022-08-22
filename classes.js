class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(other) {
        return new Vector(this.x + other.x, this.y + other.y);
    }
    mult(scalar) {
        return new Vector(this.x * scalar, this.y * scalar);
    }
}

class Point {
    constructor(x, y, col, hist) {
        this.pos0 = new Vector(x, y);
        this.pos = new Vector(x, y);
        this.previous = new Vector(x, y);
        this.col = col;
        this.hist = hist;
        this.history = [0, int(random(0.5 * hist, 1.5 * hist))];
    }

    RK4(dt, t) {
        this.previous = this.pos;
        let k1 = f(this.pos, t);
        let k2 = f(this.pos.add(k1.mult(0.5 * dt)), t + 0.5 * dt);
        let k3 = f(this.pos.add(k2.mult(0.5 * dt)), t + 0.5 * dt);
        let k4 = f(this.pos.add(k1.mult(dt)), t + dt);
        let ksum = k1.add(k4);
        ksum = ksum.add(k2.mult(2));
        ksum = ksum.add(k3.mult(2));
        ksum = ksum.mult(0.16667 * dt);
        this.pos = this.pos.add(ksum);
        this.history[0] += 1;
        if (this.history[0] > this.history[1]) {
            this.restart();
        }
    }

    euler(dt, t) {
        this.previous = this.pos;
        this.pos = this.pos.add(f(this.pos, t).mult(dt));
        this.history[0] += 1;
        if (this.history[0] > this.history[1]) {
            this.restart();
        }
    }

    restart() {
        this.pos = this.pos0;
        this.previous = this.pos0;
        this.history[0] = 0;
        this.history[1] = int(random(0.5 * this.hist, 1.5 * this.hist));
    }
}

class System {
    constructor(x0, x1, y0, y1, N, history, method = "RK4") {
        this.N = N;
        this.points = [];
        this.x0 = x0;
        this.x1 = x1;
        this.y0 = y0;
        this.y1 = y1;
        this.t = 0;
        this.method = method;
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                let col = color(255 * j / N, 255 * i / N, 255 - 255 * i * j / (N * N));
                this.points[i + j * N] = new Point(i * (x1 - x0) / (N - 1) + x0, j * (y1 - y0) / (N - 1) + y0,
                    col, history);
            }
        }
    }
    shiftX(x) {
        return width * (0.5 * (1 - zoom) + zoom * (x - this.x0) / (this.x1 - this.x0));
    }
    shiftY(y) {
        return height * (0.5 * (1 - zoom) + zoom * (y - this.y1) / (this.y0 - this.y1));
    }
    stepPoints(dt, steps) {
        for (let p of this.points) {
            for (let k = 0; k < steps; k++) {
                p.RK4(dt, this.t);
            }
        }
        this.t += dt * steps;
    }
    drawStepLines(dt, skipSteps) {
        background(0, 0.02);
        for (let p of this.points) {
            for (let k = 0; k < skipSteps; k++) {
                if (this.method === "RK4") {
                    p.RK4(dt, this.t);
                }
                else {
                    p.euler(dt, this.t)
                }
            }
            stroke(p.col);
            line(this.shiftX(p.pos.x), this.shiftY(p.pos.y),
                this.shiftX(p.previous.x), this.shiftY(p.previous.y));
        }
        this.t += dt * skipSteps;
    }
}
