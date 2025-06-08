
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

function Heart(x, y, size, speed) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = speed;
    this.opacity = 1;
}

Heart.prototype.draw = function () {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = 'rgba(255, 0, 100, 0.8)';
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.bezierCurveTo(this.x + this.size / 2, this.y - this.size,
                      this.x + this.size * 1.5, this.y + this.size / 3,
                      this.x, this.y + this.size);
    ctx.bezierCurveTo(this.x - this.size * 1.5, this.y + this.size / 3,
                      this.x - this.size / 2, this.y - this.size,
                      this.x, this.y);
    ctx.fill();
    ctx.restore();
}

Heart.prototype.update = function () {
    this.y -= this.speed;
    this.opacity -= 0.005;
};

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hearts.forEach((heart, i) => {
        heart.update();
        heart.draw();
        if (heart.opacity <= 0) {
            hearts.splice(i, 1);
        }
    });
    requestAnimationFrame(animate);
}

setInterval(() => {
    let x = Math.random() * canvas.width;
    let y = canvas.height;
    let size = 20 + Math.random() * 10;
    let speed = 1 + Math.random() * 2;
    hearts.push(new Heart(x, y, size, speed));
}, 200);

animate();
