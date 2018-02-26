const WIDTH = document.body.clientWidth
const HEIGHT = document.body.clientHeight

//canvas
const app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0x665d3c });
document.body.appendChild(app.view);

//旋转矿工
const minRotate = 0
const maxRotate = 90
const speed = 1
let rotate = minRotate
let mode = "left"
const hookY = 100
/**
 * @name 钩子
*/
var bunny = PIXI.Sprite.fromImage('assets/images/gouzi.png')

//设置矿工锚点 为正中心
bunny.anchor.set(0.1);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = hookY;



app.ticker.add((delta) => {
    switch (mode) {
        case "left":
            rotate += speed;
            if (rotate > maxRotate) {
                mode = "right";
                rotate -= speed;
                return;
            }
            break;
        case "right":
            rotate -= speed;
            if (rotate < minRotate) {
                mode = "default";
                rotate += speed;
                return;
            }
            break;
        case "default":
            rotate += speed;
            if (rotate > maxRotate) {
                mode = "left";
                rotate = minRotate;
                return;
            }
            break;
    }
    bunny.rotation = Math.PI * rotate / 180

    // bunny.rotation += 0.1 * delta * d;
});



/**
 * @name 文字
 */
const firstPass = new PIXI.Text('第一关');
firstPass.x = app.screen.width - 200;
firstPass.y = hookY;

//将矿工 添加到 舞台
app.stage.addChild(bunny);
//第一关文字
app.stage.addChild(firstPass)
