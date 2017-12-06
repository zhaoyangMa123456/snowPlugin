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
        image: ''   // 雪花路径，必填 *
    }
    var settings = this.extend(_default, options)
    this.snowsList = []    // 雪花数据列表
    this.settings = settings   // 配置设置
    this.ctx = settings.canvas.getContext("2d") // canvas的context
    this.img=new Image()    // 雪花图片

    /*********
     * 初始化
     */
    this.init()
}

/*************************
 * 初始化
 */
SnowHandler.prototype.init = function () {
    this.initDomHandler()
    this.snowsListHandler()
    this.drawImageHandler()
}

/************************************
 * 初始化dom配置
 ************************************/
SnowHandler.prototype.initDomHandler = function () {
    this.settings.width = this.settings.canvas.width = this.domGetValue(this.settings.width, 'width')
    this.settings.height = this.settings.canvas.height = this.domGetValue(this.settings.height, 'height')
}
/**********
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


/************************************
 * 雪花列表控制
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
 * 参数 true： Y为随机数， false： Y为1
 */
SnowHandler.prototype.createSnowJson = function (options) {
    var yVal = options ? parseInt(Math.random() * (this.settings.height - 1)) + 1 : 1
    var randomWidth = (Math.random() * 0.75 + 0.5) * this.settings.imgWidth,
        rendomHeight = this.settings.imgHeight / this.settings.imgWidth * randomWidth
    return {
        x: parseInt(Math.random() * (this.settings.width - 50)) + 50,
        y: yVal,
        stepSize: (Math.random() * 10) / 50,
        step: 0,
        width: randomWidth,
        height: rendomHeight
    }
}


/************************************
 * 雪花图片画图控制
 ************************************/
SnowHandler.prototype.drawImageHandler = function () {
    var _this = this
    this.img.src= this.settings.image
    this.img.onload = function () {
        _this.drawImagePosition()
        _this.initMoveHandler()
    }

}
/****************
 * 雪花图片位置渲染
 */
SnowHandler.prototype.drawImagePosition = function () {
    for (var i = 0; i < this.snowsList.length; i ++) {
        this.ctx.drawImage(this.img, this.snowsList[i].x, this.snowsList[i].y , this.snowsList[i].width, this.snowsList[i].height);
    }
}

/************************************
 * 雪花运动控制
 ************************************/
SnowHandler.prototype.initMoveHandler = function () {
    var _this = this
    var intervalTimer = setInterval(function () {
        _this.initMoveTimer()
    }, 1000 / 60)
}
/**************
 * 定时运动
 */
SnowHandler.prototype.initMoveTimer = function () {
    var _this = this
    _this.ctx.clearRect(0, 0, _this.settings.width, _this.settings.height);
    _this.resetMovePosition()
    _this.drawImagePosition()
}
/**************
 * 每次运动时位置的重置
 */
SnowHandler.prototype.resetMovePosition = function () {
    var _this = this
    for (var i = 0; i < this.snowsList.length; i++) {
        var snowItem = this.snowsList[i]
        snowItem.step += .05
        snowItem.x -= snowItem.stepSize + Math.cos(snowItem.step * 0.02)
        snowItem.y +=  snowItem.stepSize + Math.abs(Math.cos(snowItem.step * 0.2))
        if (snowItem.x < 0 || snowItem.y > this.settings.height) {
            this.resetSnowsList(i)
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



















