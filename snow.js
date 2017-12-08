/***************
 * 飘雪花模块插件
 *
 * 马朝阳
 * 2017.12.05
 */

/*******************************************************
 * 模块开始
 *
 */
function SnowHandler(options) {
    /*********
     * 变量设置
     */
    var _default = {
        canvas: '', // canvas元素，必填 *
        count: 10,  // 显示雪花数量
        width: '100%',    // canvas宽
        height: 200,    // canvas高
        imgWidth: 30,   // 雪花宽
        imgHeight: 30,  // 雪花高
        image: '',   // 雪花路径，必填 *
        cloudImage: 'http://mazhaoyang.cn/Public/Blog/src/images/cloud1.png',    // 云朵图片
        wheelImage: 'http://mazhaoyang.cn/Public/Blog/src/images/lunzi.png',      // 轮子图片
        mechineImage: 'http://mazhaoyang.cn/Public/Blog/src/images/banner-bbg2.png'  // 机器图片
    }
    var settings = this.extend(_default, options)
    this.snowsList = []    // 雪花数据列表
    this.cloudList = []     // 云朵数据列表
    this.triangleList = []  // 三角形列表
    this.wheelList = []     // 轮子列表
    this.machinelList = []  // 机器列表
    this.triangleTime = 60   //  三角形计时
    this.triangleRandom = 0  // 三角形随机数
    this.settings = settings   // 配置设置
    this.ctx = settings.canvas.getContext("2d") // canvas的context
    this.imgSnow=new Image()    // 雪花图片
    this.imgCloud=new Image()    // 云朵图片
    this.imgWheel=new Image()    // 轮子图片
    this.imgMechine=new Image()    // 机器图片

    /*********
     * 初始化
     */
    this.init()
}

/*************************
 * 初始化
 */
SnowHandler.prototype.init = function () {
    this.initDomHandler()       // 初始化dom
    this.initDataListHandler()  // 初始化数据
    this.initDrawImageHandler() // 初始化画图
    this.initMoveHandler()      // 初始化运动
}

/*******************************************************************************************************************
 *                                              初始化dom配置
 *******************************************************************************************************************/
SnowHandler.prototype.initDomHandler = function () {
    this.settings.width = this.settings.canvas.width = this.domGetValue(this.settings.width, 'width')
    this.settings.height = this.settings.canvas.height = this.domGetValue(this.settings.height, 'height')
}
/***********************
 * 判断参数类型：百分比/数值
 * 返回最终数值
 */
SnowHandler.prototype.domGetValue = function (val, attr) {
    var reg = /^((\d+\.?\d*)|(\.\d+))\%$/
    var parentDomVal = parseInt(getComputedStyle(this.settings.canvas.parentNode)[attr])
    if (reg.test(val)) {
        var per = parseInt(val) / 100
        return parentDomVal * per
    } else {
        return val
    }
}

/*******************************************************************************************************************
 *                                              数据列表控制
 *******************************************************************************************************************/

/************************************
 *          初始化列表控制
 ************************************/
SnowHandler.prototype.initDataListHandler = function () {
    this.snowsListHandler()
    this.MachineListHandler()
    this.cloudListHandler()
    this.triangleListHandler()
    this.wheelListHandler()
}

/************************************
 *          雪花列表控制
 ************************************/
/**********
 * 初始化雪花列表数据
 */
SnowHandler.prototype.snowsListHandler = function () {
    var arr = []
    for (var i = 0; i < this.settings.count; i++) {
        var json = this.createSnowJson(true)
        arr.push(json)
    }
    this.snowsList = arr
}
/**********
 * 更新雪花列表数据
 */
SnowHandler.prototype.resetSnowsList = function (index) {
    var json = this.createSnowJson()
    this.snowsList.splice(index, 1, json)
}
/************
 * 创建一个雪花数据
 * 参数 true： Y为随机数， false： Y为 -雪花高度
 */
SnowHandler.prototype.createSnowJson = function (options) {
    var randomWidth = (Math.random() * 0.75 + 0.5) * this.settings.imgWidth,
        rendomHeight = this.settings.imgHeight / this.settings.imgWidth * randomWidth,
        yVal = options ? parseInt(Math.random() * (this.settings.height - 1)) + 1 : -rendomHeight
    return {
        x: parseInt(Math.random() * (this.settings.width - 50)) + 50,
        y: yVal,
        stepSize: (Math.random() * 10) / 50,
        step: 0,
        touch: 0,   // 被鼠标划过
        touchX: 0,
        touchY: 0,
        width: randomWidth,
        height: rendomHeight
    }
}

/*************************************
 *          云朵列表数据
 ************************************/
SnowHandler.prototype.cloudListHandler = function () {
    this.cloudList = [
        {
            x: 100,
            y: 10,
            step: 0,
            touch: 0,
            touchX: 0,
            width: 118,
            height: 47
        },
        {
            x: 500,
            y: 150,
            step: 0,
            touch: 0,
            touchX: 0,
            width: 70,
            height: 28
        },
        {
            x: 800,
            y: 80,
            step: 0,
            touch: 0,
            touchX: 0,
            width: 70,
            height: 28
        },
        {
            x: 1800,
            y: this.settings.height - 80,
            step: 0,
            touch: 0,
            touchX: 0,
            width: 118,
            height: 47
        }
    ]
}

/*************************************
 *          三角形列表数据
 ************************************/
SnowHandler.prototype.triangleListHandler = function () {
    this.triangleList = [
        {
            x1: 96,
            y1: 57,
            x2: 136,
            y2: 60,
            x3: 110,
            y3: 94,
            color: '#87d1eb',
            reColor: '#87d1eb'
        },
        {
            x1: 159,
            y1: 28,
            x2: 136,
            y2: 60,
            x3: 174,
            y3: 65,
            color: '#87d1eb',
            reColor: '#87d1eb'
        },
        {
            x1: 174,
            y1: 65,
            x2: 214,
            y2: 69,
            x3: 192,
            y3: 101,
            color: '#87d1eb',
            reColor: '#87d1eb'
        },
        {
            x1: 192,
            y1: 101,
            x2: 167,
            y2: 135,
            x3: 207,
            y3: 139,
            color: '#80c5d1',
            reColor: '#80c5d1'
        },
        {
            x1: 127,
            y1: 129,
            x2: 167,
            y2: 135,
            x3: 143,
            y3: 167,
            color: '#87d1eb',
            reColor: '#87d1eb'
        },
        {
            x1: 88,
            y1: 126,
            x2: 127,
            y2: 129,
            x3: 110,
            y3: 94,
            color: '#8dd6e2',
            reColor: '#8dd6e2'
        },
        {
            x1: 110,
            y1: 94,
            x2: 127,
            y2: 129,
            x3: 151,
            y3: 96,
            color: '#6dd8e2',
            reColor: '#87d1eb'
        },
        {
            x1: 127,
            y1: 129,
            x2: 167,
            y2: 135,
            x3: 151,
            y3: 96,
            color: '#8dd6e2',
            reColor: '#8dd6e2'
        },
        {
            x1: 167,
            y1: 135,
            x2: 192,
            y2: 101,
            x3: 151,
            y3: 96,
            color: '#87d1eb',
            reColor: '#87d1eb'
        },
        {
            x1: 192,
            y1: 101,
            x2: 174,
            y2: 65,
            x3: 151,
            y3: 96,
            color: '#8dd6e2',
            reColor: '#8dd6e2'
        },
        {
            x1: 136,
            y1: 60,
            x2: 174,
            y2: 65,
            x3: 151,
            y3: 96,
            color: '#89d9f3',
            reColor: '#89d9f3'
        },
        {
            x1: 136,
            y1: 60,
            x2: 110,
            y2: 94,
            x3: 151,
            y3: 96,
            color: '#8dd6e2',
            reColor: '#8dd6e2'
        },
    ]
}

/*************************************
 *          轮子列表数据
 ************************************/
SnowHandler.prototype.wheelListHandler = function () {
    this.wheelList = [
        {
            x: this.settings.width / 2 - 100,
            y: 70,
            width: 50,
            height: 50,
            rotate: 0,
            speed: 1
        },
        {
            x: this.settings.width / 2 - 223,
            y: 46,
            width: 30,
            height: 30,
            rotate: 0,
            speed: 2
        },
        {
            x: this.settings.width / 2 - 160,
            y: 210,
            width: 40,
            height: 40,
            rotate: 0,
            speed: 2
        }
    ]
}

/*************************************
 *          机器数据
 ************************************/
SnowHandler.prototype.MachineListHandler = function () {
    this.machinelList = [
        {
            x: this.settings.width / 2 - 400,
            y: 0,
            width: 955,
            height: 259
        }
    ]
}



/*******************************************************************************************************************
 *                                              图片画图控制
 *******************************************************************************************************************/
/****************************************
 *               初始化图片画图
 ****************************************/
SnowHandler.prototype.initDrawImageHandler = function () {
    this.drawTriangleHandler()
    this.drawMachineHandler()
    this.drawWheelHandler()
    this.drawCloudHandler()
    this.drawSnowHandler()
}
/****************
 * 重绘图片画图
 */
SnowHandler.prototype.reDrawImageHandler = function () {
    this.drawTriangleHandler()
    this.drawMechinePosition()
    this.drawWheelPosition()
    this.drawSnowPosition()
    this.drawCloudPosition()
}

/****************************************
 *               雪花画图
 ****************************************/
SnowHandler.prototype.drawSnowHandler = function () {
    var _this = this
    this.imgSnow.src= this.settings.image
    this.imgSnow.onload = function () {
        _this.drawSnowPosition()
    }
}
/****************
 * 雪花图片位置渲染
 */
SnowHandler.prototype.drawSnowPosition = function () {
    for (var i = 0; i < this.snowsList.length; i ++) {
        this.ctx.drawImage(this.imgSnow, this.snowsList[i].x, this.snowsList[i].y , this.snowsList[i].width, this.snowsList[i].height);
    }
}
/****************************************
 *               云朵画图
 ****************************************/
SnowHandler.prototype.drawCloudHandler = function () {
    var _this = this
    this.imgCloud.src= this.settings.cloudImage
    this.imgCloud.onload = function () {
        _this.drawCloudPosition()
    }
}
/****************
 * 云朵图片位置渲染
 */
SnowHandler.prototype.drawCloudPosition = function () {
    for (var i = 0; i < this.cloudList.length; i ++) {
        this.ctx.drawImage(this.imgCloud, this.cloudList[i].x, this.cloudList[i].y , this.cloudList[i].width, this.cloudList[i].height);
    }
}

/****************************************
 *               三角形画图
 ****************************************/
SnowHandler.prototype.drawTriangleHandler = function () {
    for (var i = 0; i < this.triangleList.length; i ++) {
        var triangleItem = this.triangleList[i]
        this.ctx.beginPath()
        this.ctx.moveTo(triangleItem.x1, triangleItem.y1)
        this.ctx.lineTo(triangleItem.x2, triangleItem.y2)
        this.ctx.lineTo(triangleItem.x3, triangleItem.y3)
        this.ctx.fillStyle = triangleItem.color
        this.ctx.fill();
    }
}

/****************************************
 *               轮子画图
 ****************************************/
SnowHandler.prototype.drawWheelHandler = function () {
    var _this = this
    this.imgWheel.src= this.settings.wheelImage
    this.imgWheel.onload = function () {
        _this.drawWheelPosition()
    }
}
/***************
 * 轮子图片渲染
 */
SnowHandler.prototype.drawWheelPosition = function () {
    for (var i = 0; i < this.wheelList.length; i ++) {
        var wheelItem = this.wheelList[i]
        this.ctx.save();
        this.ctx.translate(wheelItem.x, wheelItem.y);
        this.ctx.rotate(wheelItem.rotate*Math.PI/180);
        this.ctx.drawImage(this.imgWheel,-wheelItem.width/2,-wheelItem.height/2, wheelItem.width, wheelItem.height);
        this.ctx.restore();
    }
}

/****************************************
 *               机器画图
 ****************************************/
SnowHandler.prototype.drawMachineHandler = function () {
    var _this = this
    this.imgMechine.src= this.settings.mechineImage
    this.imgMechine.onload = function () {
        _this.drawMechinePosition()
    }
}
/***************
 * 机器图片渲染
 */
SnowHandler.prototype.drawMechinePosition = function () {
    for (var i = 0; i < this.machinelList.length; i ++) {
        this.ctx.save();
        this.ctx.drawImage(this.imgMechine, this.machinelList[i].x, this.machinelList[i].y , this.machinelList[i].width, this.machinelList[i].height);
        this.ctx.restore();
    }
}


/*******************************************************************************************************************
 *                                              运动控制
 *******************************************************************************************************************/
/************************************
 *          初始化运动控制
 ************************************/
SnowHandler.prototype.initMoveHandler = function () {
   this.startMoveHandler()
}
/***********************
 * 创建鼠标事件监听，并开启定时
 */
SnowHandler.prototype.startMoveHandler = function () {
    var _this = this
    var opt = {}
    document.documentElement.addEventListener('mousemove', function (e) {
        opt.mouseX = e.clientX - _this.settings.canvas.getBoundingClientRect().left
        opt.mouseY = e.clientY - _this.settings.canvas.getBoundingClientRect().top
        opt.event = e
    })
    var intervalTimer = setInterval(function () {
        _this.ctx.clearRect(0, 0, _this.settings.width, _this.settings.height)
        _this.resetMovePosition(opt)
        _this.reDrawImageHandler()
    }, 1000 / 60)
}

/************************************
 *          运动位置重置
 ************************************/
SnowHandler.prototype.resetMovePosition = function (opt) {
    this.resetSnowMovePosition(opt)
    this.resetCloudMovePosition(opt)
    this.resetTriangleMovePosition()
    this.resetWheelMovePosition()
}
/**************
 * 雪花运动位置的重置
 */
SnowHandler.prototype.resetSnowMovePosition = function (opt) {
    for (var i = 0; i < this.snowsList.length; i++) {
        var snowItem = this.snowsList[i]
        snowItem.step += .05
        /***
         * 设置雪花位置
         */
        snowItem.x -= snowItem.stepSize + Math.cos(snowItem.step * 0.02)
        snowItem.y +=  snowItem.stepSize + Math.abs(Math.cos(snowItem.step * 0.2))

        this.mouseMoveSnowPosition(snowItem, opt)
        /***
         * 判断是否为鼠标触摸雪花
         */
        if (snowItem.touch > 0) {
            snowItem.touch -= 0.2
            var xVal = (snowItem.touchX > 0) ? -snowItem.touch * 0.2 : snowItem.touch * 0.2,
                yVal = (snowItem.touchY > 0) ? -snowItem.touch * 0.2 : snowItem.touch * 0.2
            snowItem.x += xVal
            snowItem.y += yVal
        }

        /*****
         * 进入边缘，删除并重新生成一个
         */
        if ((snowItem.x + snowItem.width) < 0 || (snowItem.y - snowItem.height) > this.settings.height) {
            this.resetSnowsList(i)
        }
    }
}
/***************
 * 雪花控制鼠标接近时的响应位移
 */
SnowHandler.prototype.mouseMoveSnowPosition = function (snowItem, opt) {
    var _this = this
    var mouseX = opt.mouseX,
        mouseY = opt.mouseY,
        snowX = snowItem.width / 2 + snowItem.x,
        snowY = snowItem.height / 2 + snowItem.y,
        distance = Math.sqrt((mouseX - snowX) * (mouseX - snowX) + (mouseY - snowY) * (mouseY - snowY));

    if (distance < 30 && snowItem.touch <= 0) {
        snowItem.touch = 10
        snowItem.touchX = mouseX - snowX
        snowItem.touchY = mouseY - snowY
    }
}

/**************
 * 云朵运动位置的重置
 */
SnowHandler.prototype.resetCloudMovePosition = function (opt) {
    for (var i = 0; i < this.cloudList.length; i++) {
        var cloudItem = this.cloudList[i]
        this.mouseMoveCloudPosition(cloudItem, opt)
        if (cloudItem.touch > 0) {
            cloudItem.touch -= 0.2
            var xVal = (cloudItem.touchX > 0) ? -cloudItem.touch * 0.2 : cloudItem.touch * 0.2
            cloudItem.x += xVal
        }
        if ((cloudItem.x + cloudItem.width) > 0) {
            cloudItem.x --
        } else {
            cloudItem.x = this.settings.width
            cloudItem.touch = 0
            cloudItem.touchX = 0
        }
    }
}
/**************
 * 云朵雪花控制鼠标解禁时响应位移
 */
SnowHandler.prototype.mouseMoveCloudPosition = function (item, opt) {
    var mouseX = opt.mouseX,
        mouseY = opt.mouseY,
        itemX = item.width / 2 + item.x,
        itemY = item.height / 2 + item.y,
        distance = Math.sqrt((mouseX - itemX) * (mouseX - itemX) + (mouseY - itemY) * (mouseY - itemY));

    if (distance < 30 && item.touch <= 0) {
        item.touch = 10
        item.touchX = mouseX - itemX
        item.touchY = mouseY - itemY
    }

}

/**************
 * 三角形颜色的重置
 */
SnowHandler.prototype.resetTriangleMovePosition = function () {
    var len = this.triangleList.length
    if (this.triangleTime > 0) {
        this.triangleTime -= 1
    } else {
        this.triangleTime = 60
        this.triangleRandom = parseInt(Math.random() * len)
        for (var i = 0; i < len; i++) {
            this.triangleList[i].color = this.triangleList[i].reColor
        }
        this.triangleList[this.triangleRandom].color = '#6dd8e2'
    }
}

/***************
 * 轮子角度重置
 */
SnowHandler.prototype.resetWheelMovePosition = function () {
    var len = this.wheelList.length
    for (var i = 0; i < len; i++) {
        var wheelItem = this.wheelList[i]
        if (wheelItem.rotate <= 360) {
            wheelItem.rotate += wheelItem.speed
        } else {
            wheelItem.rotate = 0
        }
    }
}

/****************************
 *          工具方法
 ****************************/
SnowHandler.prototype.extend = function (origin, options) {
    if (options instanceof Object && options.prototype === undefined) {
        for (var item in options) {
            if (options[item] !== undefined ) {
                origin[item] = options[item]
            }
        }
    }
    return origin
}



















