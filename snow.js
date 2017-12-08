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
        cloudImage: 'http://mazhaoyang.cn/Public/Blog/src/images/cloud1.png'
    }
    var settings = this.extend(_default, options)
    this.snowsList = []    // 雪花数据列表
    this.cloudList = []     // 云朵数据列表
    this.settings = settings   // 配置设置
    this.ctx = settings.canvas.getContext("2d") // canvas的context
    this.imgSnow=new Image()    // 雪花图片
    this.imgCloud=new Image()    // 云朵图片
    this.imageCount = 0         // 图片预加载完成数

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
    this.cloudListHandler()
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
            y: this.settings.height - 47,
            step: 0,
            touch: 0,
            touchX: 0,
            width: 118,
            height: 47
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
    this.drawSnowHandler()
    this.drawCloudHandler()
}
/****************
 * 重绘图片画图
 */
SnowHandler.prototype.reDrawImageHandler = function () {
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
 * 雪花图片位置渲染
 */
SnowHandler.prototype.drawCloudPosition = function () {
    for (var i = 0; i < this.cloudList.length; i ++) {
        this.ctx.drawImage(this.imgCloud, this.cloudList[i].x, this.cloudList[i].y , this.cloudList[i].width, this.cloudList[i].height);
    }
}



/*******************************************************************************************************************
 *                                              运动控制
 *******************************************************************************************************************/
/************************************
 *          初始化运动控制
 ************************************/
SnowHandler.prototype.initMoveHandler = function () {
    this.imageCount ++
    if (this.imageCount === 1) {
        this.startMoveHandler()
    }
}
/***********************
 * 创建鼠标事件监听，并开启定时
 */
SnowHandler.prototype.startMoveHandler = function () {
    var _this = this
    var opt = {}
    this.settings.canvas.addEventListener('mousemove', function (e) {
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



















