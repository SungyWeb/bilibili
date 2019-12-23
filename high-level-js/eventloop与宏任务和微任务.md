# 如何理解EventLoop——宏任务和微任务篇

## 宏任务(MacroTask)引入

在 JS 中，大部分的任务都是在主线程上执行，常见的任务有:

1. 渲染事件
2. 用户交互事件
3. js脚本执行
4. 网络请求、文件读写完成等

为了让这些事件有条不紊地进行，JS引擎需要对之执行的顺序做一定的安排，V8 其实采用的是一种***队列***的方式来存储这些任务， 即先进来的先执行。
队列分为两种，除了上述的4中常见的***普通任务队列***，还有一个叫做***延迟队列***，它专门处理诸如`setTimeout`和`setInterval`这样的定时回调任务，那么这两种队列中的任务都属于***宏任务***

注意：setTimeout/setInterval如果没有时间参数，则会立即加入到微任务队列，如果有时间参数，则在到达时间后，加入到微任务队列；其他如图片/ajax完成后，添加到微任务队列中

## 微任务(MicroTask)引入

对于每个宏任务而言，其内部都有一个微任务队列。

其实引入微任务的初衷是为了解决异步回调的问题。在每一个宏任务中定义一个微任务队列，当该宏任务执行完成，会检查其中的微任务队列，如果为空则直接执行下一个宏任务，如果不为空，则依次执行微任务，执行完成才去执行下一个宏任务。

***常见的微任务***有MutationObserver、Promise.then(或.reject) 以及以 Promise 为基础开发的其他技术(比如fetch API), 还包括 V8 的垃圾回收过程。

## 如何理解eventloop（浏览器）

先看一段代码
```js
console.log('start');
setTimeout(() => {
  console.log('timeout');
});
Promise.resolve().then(() => {
  console.log('resolve');
});
console.log('end');
```

1.刚开始整个脚本作为一个宏任务来执行，对于同步代码直接压入执行栈(关于执行栈，若不了解请移步之前的文章《JavaScript内存机制之问——数据是如何存储的？》)进行执行，因此先打印start和end
2. setTimeout 作为一个宏任务放入宏任务队列
3. Promise.then作为一个为微任务放入到微任务队列
4. 当本次宏任务执行完，检查微任务队列，发现一个Promise.then, 执行
5. 接下来进入到下一个宏任务——setTimeout, 执行

因此最后的顺序是:
```js
start
end
resolve
timeout
```

这样就带大家直观地感受到了浏览器环境下 EventLoop 的执行流程。不过，这只是其中的一部分情况，接下来我们来做一个更完整的总结。

1. 一开始整段脚本作为第一个宏任务执行
2. 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
3. 当前宏任务执行完出队，检查微任务队列，如果有则依次执行，直到微任务队列为空
4. 执行浏览器 UI 线程的渲染工作
5. 检查是否有Web worker任务，有则执行
6. 执行队首新的宏任务，回到2，依此循环，直到宏任务和微任务队列都为空

## 练习
```js
Promise.resolve().then(()=>{
  console.log('Promise1')  
  setTimeout(()=>{
    console.log('setTimeout2')
  },0)
});
setTimeout(()=>{
  console.log('setTimeout1')
  Promise.resolve().then(()=>{
    console.log('Promise2')    
  })
},0);
console.log('start');

// start
// Promise1
// setTimeout1
// Promise2
// setTimeout2
```