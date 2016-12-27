/**
 * Created by Administrator on 2016/12/14.
 */

/**
 *
 * @param ctx  ����
 * @param argu   src:ͼƬ��Դ   posX:������ҳ���г�ʼx����  posY: ������ҳ���г�ʼy����   direction: �����ʼ����
 */
function createModule(ctx,argu) {
    this.ctx = ctx;
    this.step = 0;    // ͼƬ��֡�� 0��1��2��3
    this.flag = false;    //  ͬ��Ϊtrue, ����Ϊfalse
    // ����img����,����ֵ
    this.img = new Image();
    for(var key in argu) {
        this.img[key] = argu[key];
    }
    // ��ʼ��������ҳ���е�λ��
    this.init();
}

createModule.prototype = {
    constructor: createModule,
    init: function () {
        var _that = this;
        _that.ctx.clearRect(_that.img.posX,_that.img.posY,_that.img.width/4,_that.img.height/4);
        _that.ctx.globalCompositeOperation = "xor";
        // �������ﲻͬ�ĳ����ȡ��img�е�y��λ�ã�(x�̶�Ϊ0)��
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
    // �˷��������޸�this.img.direction����ֵ��  ����ǰ������˶�������һ�����
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
    // ǰ�������˶�
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
    // ���ڿ����˶�֡����0-3֮��任
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
    // ����ȷ������������˶��ķ����������ң��Ƿ��뵱ǰ����һ�£���һ����ǰ��һ����������ͬ�ı䷽��ͣ���ڵ�һ֡
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


