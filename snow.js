/***************
 * 飘雪花模块插件
 *
 * 马朝阳
 * 2017.12.05
 *
 * 依赖jquery
 *
 */

(function($) {
    /*********
     * 将snow方法挂到jquery上
     */
    $.fn.snow = function (options) {
        var _default = {
            count: 10,
            width: 1000,
            height: 200,
            imgWidth: 30,
            imgHeight: 30,
            image: ''
        }
        _default.canvas = $(this).get(0)
        var settings = $.extend({}, _default, options)
        new SnowHandler(settings)
    }


    /*******************************************************
     * 模块开始
     */
    function SnowHandler(settings) {
        this.snowsList = []    // 雪花数据列表
        this.settings = settings   // 配置设置
        this.ctx = settings.canvas.getContext("2d") // canvas的context
        this.img=new Image()    // 雪花图片

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
        this.settings.canvas.width = this.settings.width
        this.settings.canvas.height = this.settings.height
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
            var json = {
                x: parseInt(Math.random() * (this.settings.width - 50)) + 50,
                y: parseInt(Math.random() * (this.settings.height - 1)) + 1,
                stepSize: (Math.random() * 10) / 50,
                step: 0
            }
            arr.push(json)
        }
        this.snowsList = arr
    }
    /**********
     * 更新雪花列表数据
     */
    SnowHandler.prototype.resetSnowsList = function (index) {
        var json = {
            x: parseInt(Math.random() * (this.settings.width - 50)) + 50,
            y: 1,
            stepSize: (Math.random() * 10) / 50,
            step: 0
        }
        this.snowsList.splice(index, 1, json)
    }

    /************************************
     * 雪花图片画图控制
     ************************************/
    SnowHandler.prototype.drawImageHandler = function () {
        var _this = this
        this.img.width = 20
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
            this.ctx.drawImage(this.img, this.snowsList[i].x, this.snowsList[i].y , this.settings.imgWidth, this.settings.imgHeight);
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
            snowItem.x -= snowItem.stepSize + Math.cos((snowItem.step += .05) * 0.02)
            snowItem.y +=  snowItem.stepSize + Math.abs(Math.cos((snowItem.step += .05) * 0.2))
            if (snowItem.x < 0 || snowItem.y > this.settings.height) {
                this.resetSnowsList(i)
            }
        }
    }

})(window.jQuery)




















