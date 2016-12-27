/**
 * Created by Administrator on 2016/12/16.
 */


function Clock(canvas,argu) {
    this.canvas = canvas;
    // 默认属性
    this.default = {
        bigR: 120,
        hourR: 10,
        minR: 6,
        secR: 4,
        color: "black"
    };
    for(var key in argu) {
        this.default[key] = argu[key];
    }
    this.init();
}
Clock.prototype = {
    constructor: Clock,
    // 初始化
    init: function () {
        var _that = this;
        this.drawClock();
        setInterval(function () {
            _that.drawClock ();
        },1000);
    },
    getDate: function () {
        var date = new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        this.drawText(hour,min,sec,this.canvas);
        return {
            hour: Math.PI * (hour / 6 - 0.5),
            min: Math.PI * (min / 30 - 0.5),
            sec: Math.PI * (sec / 30 - 0.5)
        }
    },
    // 绘制整体
    drawClock: function () {
        var clearLen = this.default.bigR*1.3;
        this.canvas.clearRect(-clearLen, -clearLen, 2*clearLen, 2*clearLen);
        alternate();
        this.radial = this.getDate();
        this.drawBigCir(this.default.bigR*1.2);
        this.drawBigCir(this.default.bigR);
        this.drawStack(this.default.bigR,this.canvas);
        // *1.1 是为了保证小球在两个环的中间
        this.drawHour(this.default.bigR*1.1,this.default.hourR,this.canvas);
        this.drawMin(this.default.bigR*1.1,this.default.minR,this.canvas);
        this.drawSec(this.default.bigR*1.1,this.default.secR,this.canvas);

    },
    // 绘制外圆
    drawBigCir: function (bigR) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.arc(0, 0, bigR, 0, 2 * Math.PI);
        ctx.stroke();
    },
    // 绘制 时分秒
    drawHour: function (bigR, smallR,ctx) {
        var hourX = bigR * Math.cos(this.radial.hour);
        var hourY = bigR * Math.sin(this.radial.hour);
        ctx.beginPath();
        ctx.fillStyle = this.default.color;
        ctx.arc(hourX, hourY, smallR, 0, 2 * Math.PI);
        ctx.fill();
    },
    drawMin: function (bigR, smallR,ctx) {
        var minX = bigR * Math.cos(this.radial.min);
        var minY = bigR * Math.sin(this.radial.min);
        ctx.beginPath();
        ctx.fillStyle = this.default.color;
        ctx.arc(minX, minY, smallR, 0, 2 * Math.PI);
        ctx.fill();
    },
    drawSec: function (bigR, smallR,ctx) {
        var secX = bigR * Math.cos(this.radial.sec);
        var secY = bigR * Math.sin(this.radial.sec);
        ctx.beginPath();
        ctx.fillStyle = this.default.color;
        ctx.arc(secX, secY, smallR, 0, 2 * Math.PI);
        ctx.fill();
    },
    // 绘制刻度 / 刻度数字
    drawStack: function (bigR,ctx) {
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "18px Arial"
        for (var i = 1; i <= 12; i++) {
            var x1 = bigR*0.9*Math.cos(i*Math.PI/6 - Math.PI/2);
            var y1 = bigR*0.9*Math.sin(i*Math.PI/6 - Math.PI/2);
            var x2 = bigR*Math.cos(i*Math.PI/6 - Math.PI/2);
            var y2 = bigR*Math.sin(i*Math.PI/6 - Math.PI/2);
            ctx.moveTo(x1,y1);
            ctx.lineTo(x2,y2);
            // 文字
            ctx.fillText(i,x1*0.85,y1*0.85);
        }
        ctx.stroke();
    },
    // 绘制中间文本
    drawText: function (hour,min,sec,ctx) {
        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;
        var time = hour + ":" + min + ":" + sec;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(-45,-30);
        ctx.lineTo(45,-30);
        ctx.lineTo(45,0);
        ctx.lineTo(-45,0);
        ctx.lineTo(-45,-30);
        ctx.stroke();
        ctx.beginPath();
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(time,0,-15);
    }
};