(function() {
      const canvas = document.createElement('canvas');
      canvas.classList.add('firework-canvas');
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);
      
      class Particle {
        constructor(x, y) {
          this.x = x;
          this.y = y;
          this.speed = Math.random() * 3 + 2;
          this.angle = Math.random() * Math.PI * 2;
          this.gravity = 0.05;
          this.opacity = 1;
          this.decay = Math.random() * 0.02 + 0.008;
          // 仓储用品配色：工业蓝+银灰+浅黄
          this.color = [
            '#4169E1', '#708090', '#D3D3D3', '#F5DEB3', '#A9A9A9'
          ][Math.floor(Math.random() * 5)];
          this.vx = Math.cos(this.angle) * this.speed;
          this.vy = Math.sin(this.angle) * this.speed;
        }
        update() {
          this.vy += this.gravity;
          this.x += this.vx;
          this.y += this.vy;
          this.opacity -= this.decay;
        }
        draw() {
          ctx.beginPath();
          ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = this.color;
          ctx.globalAlpha = this.opacity;
          ctx.fill();
        }
      }
      
      let particles = [];
      document.addEventListener('click', (e) => {
        const count = 30;
        for (let i = 0; i < count; i++) {
          particles.push(new Particle(e.clientX, e.clientY));
        }
      });
      
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles = particles.filter(p => p.opacity > 0);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
        requestAnimationFrame(animate);
      }
      animate();
    })();

(function() {
      let lastX = null;
      let lastY = null;

      document.addEventListener('mousemove', function(e) {
        // 控制密度：只在移动一定距离后生成
        if (lastX && lastY) {
          const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
          if (dist < 4) return;
        }
        lastX = e.clientX;
        lastY = e.clientY;

        const dot = document.createElement('div');
        dot.className = 'mouse-trail';
        dot.style.left = e.clientX + 'px';
        dot.style.top = e.clientY + 'px';
        document.body.appendChild(dot);

        // 动画消失
        setTimeout(() => {
          dot.style.opacity = '0';
          dot.style.transform = 'scale(0.5) translateY(6px)';
        }, 10);

        // 自动移除
        setTimeout(() => {
          dot.remove();
        }, 500);
      });
    })();