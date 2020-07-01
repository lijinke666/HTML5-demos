const WIDTH = document.body.clientWidth
const HEIGHT = document.body.clientHeight

const hookY = 100
const goldNum = 5

//canvas
const app = new PIXI.Application(WIDTH, HEIGHT, { backgroundColor: 0x665d3c });
document.body.appendChild(app.view);


/**
 * @name 文字
 */
const firstPass = new PIXI.Text('第一关');
firstPass.x = app.screen.width - 200;
firstPass.y = hookY;

/** 
 * @name 钳子
*/
class Pliers {
    constructor({ x = app.screen.width / 2, y = hookY, isSwing = true } = {}) {
        this.x = x
        this.y = y
        this.speed = 1
        //旋转矿工
        this.minRotate = 0
        this.maxRotate = 120

        this.isSwing = isSwing

        this.rotate = this.minRotate
        this.mode = "left"

        this.dragSpeed = createRandomNum(1, 5)
    }
    create() {
        this.pliers = PIXI.Sprite.fromImage('assets/images/gouzi.png')

        //设置矿工锚点 为正中心
        this.pliers.anchor.set(0.5, 0.1)

        this.pliers.x = app.screen.width / 2
        this.pliers.y = hookY
        if (this.isSwing) {
            this.swing()
        }

        app.stage.addChild(this.pliers)
    }
    swing() {
        app.ticker.add((delta) => {
            switch (this.mode) {
                case "left":
                    this.rotate += this.speed;
                    if (this.rotate > this.maxRotate) {
                        this.mode = "right";
                        this.rotate -= this.speed;
                        return;
                    }
                    break;
                case "right":
                    this.rotate -= this.speed;
                    if (this.rotate < this.minRotate) {
                        this.mode = "default";
                        this.rotate += this.speed;
                        return;
                    }
                    break;
                case "default":
                    this.rotate += this.speed;
                    if (this.rotate > this.maxRotate) {
                        this.mode = "left";
                        this.rotate = this.minRotate;
                        return;
                    }
                    break;
            }
            this.pliers.rotation = Math.PI * this.rotate / 180

        });
    }
    //重新摆动
    reSwing() {
        app.ticker.start()
    }
    //停止摆动
    stopSwing() {
        app.ticker.stop()
    }
    move(x, y) {
        console.log(x, y);
        const _x = Math.abs(x - app.screen.width / 2)
        const _y = y - hookY
        const rotation = Math.atan(_x / _y)

        console.log(rotation *180 /Math.PI);
        this.pliers.rotation = rotation
            app.ticker.add((delta) => {
                this.pliers.x += this.dragSpeed
                this.pliers.y += this.dragSpeed
                if (this.pliers.y >= app.screen.height) {

                    this.pliers.y = hookY
                    this.swing()
                }
            })
    }
}




/** 
 * @name 黄金类
*/
class Gold {
    constructor({
        scale = 1.0,
        x = app.screen.width / 2,
        y = app.screen.height / 2
    } = {}) {
        this.gold = null
        this.scale = scale
        this.x = x
        this.y = y
        console.log('gold:', `scale:${scale}`, `x:${x}`, `y:${y}`)
    }
    create() {
        this.gold = PIXI.Sprite.fromImage('assets/images/gold.png')
        this.gold.anchor.set(0.5)
        this.gold.x = this.x
        this.gold.y = this.y
        this.gold.scale.x *= this.scale
        this.gold.scale.y *= this.scale
        this.gold.interactive = true
        this.gold.buttonMode = true
        this.gold.speed = createRandomNum(1, 10)
        this.gold.rotation = Math.random() * (Math.PI * 2)

        this._onClick()
        app.stage.addChild(this.gold)
    }
    _onClick() {
        this.gold.on('pointerdown', (e) => {
            const { x, y } = e.data.global
            this.pliers = new Pliers({ isSwing: false })
            this.pliers.create()
            this.pliers.move(x, y)
        })
    }
}

const createRandomNum = (minNum, maxNum) => {
    return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

/**
 * 创建黄金
 */
for (let i = 0; i < goldNum; i++) {
    const gold = new Gold({
        scale: createRandomNum(0.5, 3),
        x: createRandomNum(0, app.screen.width),
        y: createRandomNum(hookY + 200, app.screen.height)
    })

    gold.create()
}






/**
 * 舞台成员添加
 */
//添加钳子
new Pliers().create()
//第一关文字
app.stage.addChild(firstPass)