class Snowflake {
    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight * -1;
        this.size = Math.random() * 3 + 2;
        this.speed = Math.random() * 2 + 1;
        this.swing = Math.random() * 3;
        this.swingCount = Math.random() * Math.PI * 2;
    }

    update() {
        this.y += this.speed;
        this.swingCount += 0.02;
        this.x += Math.sin(this.swingCount) * this.swing;

        // Ограничиваем падение снега до уровня сугробов
        const snowLimit = window.innerHeight - 150; // 150px - высота сугробов
        if (this.y > snowLimit) {
            this.y = Math.random() * window.innerHeight * -1;
            this.x = Math.random() * window.innerWidth;
        }
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'white';
        ctx.fill();
    }
}

class SnowAnimation {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        document.querySelector('.snow-container').appendChild(this.canvas);
        
        this.snowflakes = [];
        this.resize();
        this.createSnowflakes();
        
        window.addEventListener('resize', () => this.resize());
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSnowflakes() {
        const numberOfSnowflakes = Math.floor(window.innerWidth * 0.15);
        for (let i = 0; i < numberOfSnowflakes; i++) {
            this.snowflakes.push(new Snowflake());
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.snowflakes.forEach(snowflake => {
            snowflake.update();
            snowflake.draw(this.ctx);
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Обработчик бургер-меню
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');

    burgerMenu.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const burgerIcon = document.querySelector('.burger-icon');
        burgerIcon.classList.toggle('active');
    });

    // Закрывать меню при клике на пункт меню
    document.querySelectorAll('.nav-menu a').forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
            document.querySelector('.burger-icon').classList.remove('active');
        });
    });

    // Запуск анимации снега
    new SnowAnimation();
});