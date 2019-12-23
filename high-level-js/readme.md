# 主要内容
- 高级基础
- 框架原理
- hybrid app混合开发
- 热爱编程

## 高级基础

### 一、es6

#### 模块化的使用和编译环境
1. 模块化基本语法
    - import/export 注意有无default
2. 开发环境配置
    - webpack 功能强大
    - babel 编译es+ 为es5语法
    - rollup 功能单一 模块化打包工具 vue/react中都有使用
3. 关于js众多模块化标准
    - 没有模块化
    - AMD成为标准， require.js（CMD）
    - es6想要一统江湖
    - es6标准nodejs积极实现
    - 现代浏览器支持部分es6语法

#### class和js构造函数的区别
1. class 只是构造函数的语法糖而已 
    ```js
    class A {}
    typeof A;   // -> function
    A === A.prototype.constructor;    // -> true
    var a = new A();
    a.__proto__ === A.prototype;    // true
    ```
2. class与es5的写法有什么区别
    + class的方式更贴合面向对象的写法
    + class实现继承更加易读、易理解
    + 更加易于java等后端程序员使用
    + 本质还是语法糖
#### promise的使用

#### ES6的其他常用功能
    + let/const
    + 字符串模版
    + 解构赋值
    + 块级作用域
    + 函数默认参数
    + 箭头函数

### 二、异步

#### 单线程/异步关系
- 单线程-只有一个线程，同一时间只能做一件事，两段js不能同时执行
- 为什么是单线程？避免dom渲染冲突
- 异步是单线程的解决方案。浏览器要渲染dom，但js可以修改dom，那么js运行时，浏览器就会停止渲染dom，而且两个js同时修改dom，也会产生冲突，所以js是单线程。
- webworker可以支持多线程，但不能访问dom
#### eventLoop事件轮询
- 事件轮询是js异步的一种解决方案
#### 目前异步解决方案
#### 只使用jquery如何解决异步
#### promise的标准
#### async/await

## 框架原理

### vdom

#### 什么是vvdom，为何要用vdom
- VDOM是virtual dom的缩写，它是用js来模拟dom结构的对象
- 如果dom有变化，能够精确的知道哪里发生了变化，从而最小限度的修改dom，目的是提高重绘性能，如A有a b c 三个子元素，现在要变成ac两个子元素，以前的方法是将abc都删掉，再添加ac；而vdom则是通过对比发现，只需要删除b元素
#### vdom如何使用，核心函数有哪些
#### 了解diff算法

### MVVM

#### jquery和vue/react的区别
### 如何理解mvvm
### vue如何实现响应式
### vue如何解析模版
### 介绍vue的实现流程

### 组件化

#### 对组件化的理解
#### jsx是什么
#### jsx和vdom的关系
#### 简述react的setState
#### 阐述自己如何比较vue和react

## hybrid app混合开发

### hybrid是什么？为什么要用
### hybrid如何更新上线
### hybrid与h5有何区别
### js如何与客户端通信