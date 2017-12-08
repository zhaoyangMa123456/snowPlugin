# 我最开始是想找个插件装饰一下banner，后来索性自己写一个，也回顾一下canvas的制作。
* 演示地址：http://mazhaoyang.cn/index.php/Home/ArticleList/ArticleArticle/sid/40/aid/197.html
* 面向对象的方法写的，变量挂在构造函数，方法挂在构造函数的prototype，用的时候直接new 出来就行了
* 接受参数中，canvas和image必填，分别是当前作用的canvas和插入的雪花图片路径，宽高接受数值和百分比，数值不需要'px'
* 每个模块设置统一入口，方便接入
# 模块：我将功能分成下面几个模块
1. 公共变量挂在构造函数
2. dom控制：控制canvas的宽高，主要是需要判断传入只是百分比还是数值
3. 列表数据控制
4. 渲染控制
5. 运动控制
6. 其他工具方法
