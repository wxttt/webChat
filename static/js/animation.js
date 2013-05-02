app.core.define('snow', function(f){
    var canvas = f.$('canvas'),
        ctx = canvas.getContext("2d"),
        W,
        H;
    
    return {
        init: function(){
            console.log('begin');
            this.resizeCanvas();

            f.subscribe({
                'startSnow': this.snow().start,
                'stopSnow': this.snow().stop
            });

            f.publish({
                type: 'startSnow',
                data: ''
            });

            f.bind(window, 'resize', this.resizeCanvas)
        },
        resizeCanvas: function(){
            canvas.width = W = window.innerWidth;
            canvas.height = H = window.innerHeight;
        },
        snow: function(){
            var particles = [],
                mp = 45,
                i,
                p,
                angle = 2,
                weight = 2,
                speed = 2,
                timeCtl;
            //创建雪花
            for(i = 0; i < mp; i++){
                particles.push({
                    x: Math.random()*W,
                    y: Math.random()*H,
                    r: Math.random()*4 + 1,
                    d: Math.random()*mp
                });
            }

            function draw(){
                ctx.clearRect(0, 0 , W, H);
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.beginPath();
                for(i = 0; i < mp; i++){
                    p = particles[i];
                    ctx.moveTo(p.x, p.y);
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2, true); 
                }
                
                ctx.fill();

                update();
                //ctx.clearRect(0, 0 , W, H);
            };


            function update(){
                for(i = 0; i< mp; i++){
                    p = particles[i];
                    p.y += Math.cos(angle) + weight + p.r/2;
                    p.x += Math.sin(angle) * speed;

                    if(p.x > W || p.x < 0 || p.y > H){
                        particles[i] = {
                            x: Math.random()*W,
                            y: 0,
                            r: p.r,
                            d: p.d
                        }
                    }
                }
            };

            return {
                start: function(){
                    setInterval(draw, 33);

                },
                stop: function(){
                    clearInterval(timeCtl);
                }                
            }
        }
    }
});

app.core.startAll();