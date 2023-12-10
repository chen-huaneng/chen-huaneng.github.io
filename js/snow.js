/**
 * 雪花飘落效果:
 * @Source: https://blog.musnow.top/posts/138502038/index.html
 * @Source: https://cnhuazhu.gitee.io/2021/02/24/Hexo%E9%AD%94%E6%94%B9/Hexo%E6%B7%BB%E5%8A%A0%E9%9B%AA%E8%8A%B1%E5%8A%A8%E6%80%81%E6%95%88%E6%9E%9C%E8%83%8C%E6%99%AF/index.html
 * @Source: https://cnhuazhu.top/butterfly/2021/02/24/Hexo%E9%AD%94%E6%94%B9/Hexo%E6%B7%BB%E5%8A%A0%E9%9B%AA%E8%8A%B1%E5%8A%A8%E6%80%81%E6%95%88%E6%9E%9C%E8%83%8C%E6%99%AF/
 */

/** 第一个版本的雪花 */
if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    // 移动端不显示
}
else {
    document.write('<canvas id="snow" style="position:fixed;top:0;left:0;width:100%;height:100%;z-index:100;pointer-events:none"></canvas>');

    window && (() => {
        let e = {
            flakeCount: 50,
            minDist: 150,
            color: "255, 255, 255",
            size: 2,
            speed: .5,
            opacity: .2,
            stepsize: .5
        };
        const t = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (e) {
            window.setTimeout(e, 1e3 / 60)
        }
            ;
        window.requestAnimationFrame = t;
        const i = document.getElementById("snow"),
            n = i.getContext("2d"),
            o = e.flakeCount;
        let a = -100,
            d = -100,
            s = [];
        i.width = window.innerWidth,
            i.height = window.innerHeight;
        const h = () => {
            n.clearRect(0, 0, i.width, i.height);
            const r = e.minDist;
            for (let t = 0; t < o; t++) {
                let o = s[t];
                const h = a,
                    w = d,
                    m = o.x,
                    c = o.y,
                    p = Math.sqrt((h - m) * (h - m) + (w - c) * (w - c));
                if (p < r) {
                    const e = (h - m) / p,
                        t = (w - c) / p,
                        i = r / (p * p) / 2;
                    o.velX -= i * e,
                        o.velY -= i * t
                } else
                    o.velX *= .98,
                        o.velY < o.speed && o.speed - o.velY > .01 && (o.velY += .01 * (o.speed - o.velY)),
                        o.velX += Math.cos(o.step += .05) * o.stepSize;
                n.fillStyle = "rgba(" + e.color + ", " + o.opacity + ")",
                    o.y += o.velY,
                    o.x += o.velX,
                    (o.y >= i.height || o.y <= 0) && l(o),
                    (o.x >= i.width || o.x <= 0) && l(o),
                    n.beginPath(),
                    n.arc(o.x, o.y, o.size, 0, 2 * Math.PI),
                    n.fill()
            }
            t(h)
        }
            , l = e => {
                e.x = Math.floor(Math.random() * i.width),
                    e.y = 0,
                    e.size = 3 * Math.random() + 2,
                    e.speed = 1 * Math.random() + .5,
                    e.velY = e.speed,
                    e.velX = 0,
                    e.opacity = .5 * Math.random() + .3
            }
            ;
        document.addEventListener("mousemove", (e => {
            a = e.clientX,
                d = e.clientY
        }
        )),
            window.addEventListener("resize", (() => {
                i.width = window.innerWidth,
                    i.height = window.innerHeight
            }
            )),
            (() => {
                for (let t = 0; t < o; t++) {
                    const t = Math.floor(Math.random() * i.width)
                        , n = Math.floor(Math.random() * i.height)
                        , o = 3 * Math.random() + e.size
                        , a = 1 * Math.random() + e.speed
                        , d = .5 * Math.random() + e.opacity;
                    s.push({
                        speed: a,
                        velX: 0,
                        velY: a,
                        x: t,
                        y: n,
                        size: o,
                        stepSize: Math.random() / 30 * e.stepsize,
                        step: 0,
                        angle: 180,
                        opacity: d
                    })
                }
                h()
            }
            )()
    }
    )();
}

// 移动端不显示
if (!(navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    (function ($) {
        $.fn.snow = function (options) {
            var $flake = $('<div id="snowbox" />').css({ 'position': 'absolute', 'z-index': '9999', 'top': '-50px' }).html('&#10052;'),
                documentheight = $(document).height(),
                documentwidth = $(document).width(),
                defaults = {
                    minsize: 10,
                    maxsize: 20,
                    newon: 1000,
                    flakecolor: "#afdaef" /* 此处可以定义雪花颜色，若要白色可以改为#ffffff */
                },
                options = $.extend({}, defaults, options);
            var interval = setInterval(function () {
                var startpositionleft = Math.random() * documentwidth - 100,
                    startopacity = 0.5 + Math.random(),
                    sizeflake = options.minsize + Math.random() * options.maxsize,
                    endpositiontop = documentheight - 200,
                    endpositionleft = startpositionleft - 500 + Math.random() * 500,
                    durationfall = documentheight * 10 + Math.random() * 5000;
                $flake.clone().appendTo('body').css({
                    left: startpositionleft,
                    opacity: startopacity,
                    'font-size': sizeflake,
                    color: options.flakecolor
                }).animate({
                    top: endpositiontop,
                    left: endpositionleft,
                    opacity: 0.2
                }, durationfall, 'linear', function () {
                    $(this).remove();
                });
            }, options.newon);
        };
    })(jQuery);

    $(function () {
        $.fn.snow({
            minsize: 5, /* 定义雪花最小尺寸 */
            maxsize: 25,/* 定义雪花最大尺寸 */
            newon: 800  /* 定义密集程度，数字越小越密集 */
        });
    });
}


/** 另一个版本的雪花 */
// function snowFall(snow) {
//     /* 可配置属性 */
//     snow = snow || {};
//     this.maxFlake = snow.maxFlake || 600; /* 最多片数 */
//     this.flakeSize = snow.flakeSize || 10; /* 雪花形状 */
//     this.fallSpeed = snow.fallSpeed || 1; /* 坠落速度 */
// }

// /* 兼容写法 */
// requestAnimationFrame = window.requestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     function (callback) {
//         setTimeout(callback, 1000 / 60);
//     };

// cancelAnimationFrame = window.cancelAnimationFrame ||
//     window.mozCancelAnimationFrame ||
//     window.webkitCancelAnimationFrame ||
//     window.msCancelAnimationFrame ||
//     window.oCancelAnimationFrame;

// /* 开始下雪 */
// snowFall.prototype.start = function () {
//     /* 创建画布 */
//     snowCanvas.apply(this);
//     /* 创建雪花形状 */
//     createFlakes.apply(this);
//     /* 画雪 */
//     drawSnow.apply(this);
// }

// /* 创建画布 */
// function snowCanvas() {
//     /* 添加Dom结点 */
//     var snowcanvas = document.createElement("canvas");
//     snowcanvas.id = "snowfall";
//     snowcanvas.width = window.innerWidth;
//     snowcanvas.height = document.documentElement.scrollHeight; // 使用scrollHeight获取完整文档高度
//     snowcanvas.setAttribute("style", "position:fixed; top: 0; left: 0; z-index: 1; pointer-events: none;");
//     document.body.appendChild(snowcanvas);
//     this.canvas = snowcanvas;
//     this.ctx = snowcanvas.getContext("2d");
//     /* 窗口大小改变的处理 */
//     window.onresize = function () {
//         snowcanvas.width = window.innerWidth;
//         snowcanvas.height = document.documentElement.scrollHeight;
//     }
// }

// /* 雪运动对象 */
// function flakeMove(canvasWidth, canvasHeight, flakeSize, fallSpeed) {
//     this.x = Math.floor(Math.random() * canvasWidth); /* x坐标 */
//     this.y = Math.floor(Math.random() * canvasHeight); /* y坐标 */
//     this.size = Math.random() * flakeSize + 2; /* 形状 */
//     this.maxSize = flakeSize; /* 最大形状 */
//     this.speed = Math.random() * 1 + fallSpeed; /* 坠落速度 */
//     this.fallSpeed = fallSpeed; /* 坠落速度 */
//     this.velY = this.speed; /* Y方向速度 */
//     this.velX = 0; /* X方向速度 */
//     this.stepSize = Math.random() / 30; /* 步长 */
//     this.step = 0 /* 步数 */
// }

// flakeMove.prototype.update = function () {
//     var x = this.x,
//         y = this.y;
//     /* 左右摆动(余弦) */
//     this.velX *= 0.98;
//     if (this.velY <= this.speed) {
//         this.velY = this.speed
//     }
//     this.velX += Math.cos(this.step += .05) * this.stepSize;

//     this.y += this.velY;
//     this.x += this.velX;
//     /* 飞出边界的处理 */
//     if (this.x >= canvas.width || this.x <= 0 || this.y >= canvas.height || this.y <= 0) {
//         this.reset(canvas.width, canvas.height)
//     }
// };

// /* 飞出边界-放置最顶端继续坠落 */
// flakeMove.prototype.reset = function (width, height) {
//     this.x = Math.floor(Math.random() * width);
//     this.y = 0;
//     this.size = Math.random() * this.maxSize + 2;
//     this.speed = Math.random() * 1 + this.fallSpeed;
//     this.velY = this.speed;
//     this.velX = 0;
// };

// // 渲染雪花-随机形状（此处可修改雪花颜色！！！）
// flakeMove.prototype.render = function (ctx) {
//     var snowFlake = ctx.createRadialGradient(this.x, this.y - window.scrollY, 0, this.x, this.y - window.scrollY, this.size);
//     snowFlake.addColorStop(0, "rgba(255, 255, 255, 0.9)"); /* 此处是雪花颜色，默认是白色 */
//     snowFlake.addColorStop(.5, "rgba(255, 255, 255, 0.5)"); /* 若要改为其他颜色，请自行查 */
//     snowFlake.addColorStop(1, "rgba(255, 255, 255, 0)"); /* 找16进制的RGB 颜色代码。 */
//     ctx.save();
//     ctx.fillStyle = snowFlake;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y - window.scrollY, this.size, 0, Math.PI * 2);
//     ctx.fill();
//     ctx.restore();
// };

// /* 创建雪花-定义形状 */
// function createFlakes() {
//     var maxFlake = this.maxFlake,
//         flakes = this.flakes = [],
//         canvas = this.canvas;
//     for (var i = 0; i < maxFlake; i++) {
//         flakes.push(new flakeMove(canvas.width, canvas.height, this.flakeSize, this.fallSpeed))
//     }
// }

// /* 画雪 */
// function drawSnow() {
//     var maxFlake = this.maxFlake,
//         flakes = this.flakes;
//     ctx = this.ctx, canvas = this.canvas, that = this;
//     /* 清空雪花 */
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     for (var e = 0; e < maxFlake; e++) {
//         flakes[e].update();
//         flakes[e].render(ctx);
//     }
//     /*  一帧一帧的画 */
//     this.loop = requestAnimationFrame(function () {
//         drawSnow.apply(that);
//     });
// }

// /** 只有一种雪花就取消注释下面这段代码，然后注释掉后面的新雪花的代码 */
// /* 调用及控制方法 */
// // var snow = new snowfall({
// //     maxflake: 60
// // });
// // snow.start();

// /** 新雪花代码 */
// (function ($) {
//     $.fn.snow = function (options) {
//         var $flake = $('<div class="snowflake" />').css({
//             'position': 'absolute',
//             'z-index': '9999',
//             'top': '-50px'
//         }).html('&#10052;'),
//             documentHeight = $(document).height(),
//             documentWidth = $(document).width(),
//             defaults = {
//                 minSize: 10,
//                 maxSize: 20,
//                 newOn: 1000,
//                 flakeColor: "#AFDAEF" /* 此处可以定义雪花颜色，若要白色可以改为#FFFFFF */
//             },
//             options = $.extend({}, defaults, options);

//         var interval = setInterval(function () {
//             var startPositionLeft = Math.random() * documentWidth - 100,
//                 startOpacity = 0.5 + Math.random(),
//                 sizeFlake = options.minSize + Math.random() * options.maxSize,
//                 endPositionTop = documentHeight - 200,
//                 endPositionLeft = startPositionLeft - 500 + Math.random() * 500,
//                 durationFall = documentHeight * 10 + Math.random() * 5000;

//             $flake.clone().appendTo('body').css({
//                 left: startPositionLeft,
//                 opacity: startOpacity,
//                 'font-size': sizeFlake,
//                 color: options.flakeColor
//             }).animate({
//                 top: endPositionTop,
//                 left: endPositionLeft,
//                 opacity: 0.2
//             }, durationFall, 'linear', function () {
//                 $(this).remove();
//             });
//         }, options.newOn);
//     };
// })(jQuery);

// $(function () {
//     $.fn.snow({
//         minSize: 5, /* 定义雪花最小尺寸 */
//         maxSize: 25, /* 定义雪花最大尺寸 */
//         newOn: 800 /* 定义密集程度，数字越小越密集 */
//     });

//     // 调用新的雪花效果
//     var snowflake = new snowFall({
//         maxFlake: 30
//     });
//     snowflake.start();
// });
