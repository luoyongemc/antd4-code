import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import './index.less';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
/**
 * 具体生成器函数可以参考: https://es6.ruanyifeng.com/#docs/generator
 *
 */
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}

var hw = helloWorldGenerator(); // 生成器函数（generator）返回一个迭代器

console.log('hw', hw); //迭代器
//执行
console.log(hw.next()); // {value: 'hello', done: false}
console.log(hw.next()); // {value: 'world', done: false}
console.log(hw.next()); // {value: 'ending', done: true}
console.log(hw.next()); // {value: undefined, done: true}

/**
 * redux-saga 干的事就是把yield语句后面的暂停执行的代码进行恢复执行
 */
