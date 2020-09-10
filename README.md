# exercise-lagou
一个拉勾主页的静态页面练习，兼容到 IE11

## 实现的功能

1.页面滚动nav始终在页面顶部。功能细节：

> 页面滚动高度为0时`nav{position:relative;}`

> 页面滚动高度大于1时`nav{position:fixed;}`

2.点击回到顶部按钮，页面滚动回到页面顶部。功能细节：

> 页面滚动到指定位置显示回到顶部按钮

> 在滚动回顶部的过程中阻止鼠标滚动默认行为，滚动结束后重新还原鼠标滚动默认行为

3.淡入淡出效果

引用了之前写的一个轮播组件，链接https://github.com/Sanmer0312/JS-Swiper

非商业用途，原网址https://www.lagou.com/
