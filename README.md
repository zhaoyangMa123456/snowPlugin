# snowPlugin
一个基于canvas的飘雪花的模块
* 演示地址：http://mazhaoyang.cn
* 面向对象的方法写的，变量挂在构造函数，方法挂在构造函数的prototype，用的时候直接new 出来就行了
* 接受参数中，canvas和image必填，分别是当前作用的canvas和插入的雪花图片路径，宽高接受数值和百分比，数值不需要'px'
# 示例
`
var snowContainer = document.getElementById('snow-container')
new SnowHandler({
    canvas: snowContainer,
    count: 20,
    image: "http://mazhaoyang.cn/Public/Blog/src/images/white-snowflake.png"
})
`
