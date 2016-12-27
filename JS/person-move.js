/**
 * Created by Administrator on 2016/12/14.
 */

/**
 *
 * @param ctx  画布
 * @param argu   src:图片来源   posX:人物在页面中初始x坐标  posY: 人物在页面中初始y坐标   direction: 人物初始朝向
 */
function createModule(ctx,argu) {
    this.ctx = ctx;
    this.step = 0;    // 图片的帧数 0，1，2，3
    this.flag = false;    //  同向为true, 异向为false
    // 创建img对象,赋初值
    this.img = new Image();
    for(var key in argu) {
        this.img[key] = argu[key];
    }
    // 初始化人物在页面中的位置
    this.init();
}

createModule.prototype = {
    constructor: createModule,
    init: function () {
        var _that = this;
        _that.ctx.clearRect(_that.img.posX,_that.img.posY,_that.img.width/4,_that.img.height/4);
        _that.ctx.globalCompositeOperation = "xor";
        // 根据人物不同的朝向获取在img中的y轴位置，(x固定为0)；
        var y = _that.judgeDirection();
        _that.img.onload = fn;
        function fn() {
            _that.ctx.drawImage(
                _that.img,
                _that.step*_that.img.width/4, y, _that.img.width/4, _that.img.height/4,
                _that.img.posX, _that.img.posY, _that.img.width/4, _that.img.height/4);
        }
        fn();
    },
    // 此方法用于修改this.img.direction属性值，  给当前人物的运动方向做一个标记
    judgeDirection: function () {
        var y = 0;
        var direction = this.img.direction.toLowerCase();
        if(direction === "left") {
            y = this.img.height / 4;
            this.isFlag(-10);
        }else if(direction === "right") {
            y = this.img.height / 2;
            this.isFlag(10);
        }else if(direction === "back") {
            y = 3 * this.img.height / 4;
            this.isFlag(-10);
        }else if(direction === "forward") {
            y = 0;
            this.isFlag(10);
        }
        return y;
    },
    // 前后左右运动
    moveLeft: function () {
        this.getDirection("left");
    },
    moveRight: function () {
        this.getDirection("right");
    },
    moveForward: function () {
        this.getDirection("forward");
    },
    moveBack: function () {
        this.getDirection("back");
    },
    // 用于控制运动帧数，0-3之间变换
    isFlag: function (distance) {
        if(this.flag) {
            this.step += 1;
            if(this.step == 4 ) {
                this.step = 0;
            }
            if(this.img.direction == "left" || this.img.direction == "right") {
                this.img.posX += distance;
            }else {
                this.img.posY += distance;
            }
        }else {
            this.step = 0;
        }
    },
    // 用于确定人物接下来运动的方向（上下左右）是否与当前朝向一致，若一致向前走一步，若方向不同改变方向停留在第一帧
    getDirection: function (direction) {
        if(this.img.direction == direction) {
            this.flag = true;
        }else {
            this.flag = false;
        }
        this.img.direction = direction;
        this.init();
    }
}


