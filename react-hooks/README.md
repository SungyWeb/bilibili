# react-hooks

教程 bilibili https://www.bilibili.com/video/BV16V411672B?p=1

# 1 预备知识

## 1.1 屏幕刷新率

+ 显示器刷新率大多为60Hz（即每秒刷新60次，一次约为16.6ms，根据显示器的刷新率不同会不一样），
+ 浏览器渲染动画或页面的每一贞的速率也需要和设备屏幕的刷新率保持一致
+ 页面是一贞一贞绘制出来的，当每秒绘制的贞数（FPS）达到60及以上时， 页面的动画是流畅的， 小于这个值用户会感觉到卡顿（俗称丢帧/掉贞）
+ 每一贞的预算时间的16.6毫秒（1秒60次）
+ 所以写代码时，力求不让一贞的工作量大于60ms

## 1.2 贞

+ 每贞的开头包括样式计算、布局、和绘制
+ js的执行和页面渲染在同一个线程，所以执行j和GUI渲染无法同时执行
  > 1. 渲染引擎即我们平时说的浏览器内核 
    Firefox： Gecko引擎   
    Safari： WebKit引擎  
    Chrome：Blink引擎  
    IE:  Trident引擎  
    Edge:  EdgeHTML引擎  
  > 2. GUI 的意思是图形用户界面
+ 如果某个js任务执行时间过长，浏览器会推迟渲染


### 1.2.1 requestAnimationFrame 请求动画贞（rAF）

rAf MDN:告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行, 这个函数还可以接受一个参数，它表示rFA开始执行这个回调函数的时刻。返回值是一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数(实验中)。

![alt rAF执行时机](./docs/images/rAF.jpg)

```js
window.requestAnimationFrame(function(timestamp) {
  // do something
})
```

[dome](./docs/1.raf.html)

2. requestIdleCallback