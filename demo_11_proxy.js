/**
name:Proxy
description:为对象添加一层过滤器
method:
	get(target, propKey, receiver)
		拦截对象属性的读取，比如proxy.foo和proxy['foo']。最后一个参数receiver是一个对象，可选，参见下面Reflect.get的部分。
	set(target, propKey, value, receiver)
		拦截对象属性的设置，比如proxy.foo = v或proxy['foo'] = v，返回一个布尔值。
	has(target, propKey)
		拦截propKey in proxy的操作，返回一个布尔值。
	deleteProperty(target, propKey)
		拦截delete proxy[propKey]的操作，返回一个布尔值。
	ownKeys(target)
		拦截Object.getOwnPropertyNames(proxy)、Object.getOwnPropertySymbols(proxy)、Object.keys(proxy)，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性。
	getOwnPropertyDescriptor(target, propKey)
		拦截Object.getOwnPropertyDescriptor(proxy, propKey)，返回属性的描述对象。
	defineProperty(target, propKey, propDesc)
		拦截Object.defineProperty(proxy, propKey, propDesc）、Object.defineProperties(proxy, propDescs)，返回一个布尔值。
	preventExtensions(target)
		拦截Object.preventExtensions(proxy)，返回一个布尔值。
	getPrototypeOf(target)
		拦截Object.getPrototypeOf(proxy)，返回一个对象。
	isExtensible(target)
		拦截Object.isExtensible(proxy)，返回一个布尔值。
	setPrototypeOf(target, proto)
		拦截Object.setPrototypeOf(proxy, proto)，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
	apply(target, object, args)
		拦截 Proxy 实例作为函数调用的操作，比如proxy(...args)、proxy.call(object, ...args)、proxy.apply(...)。
	construct(target, args)
		拦截 Proxy 实例作为构造函数调用的操作，比如new proxy(...args)。
*/

"use strict"
const log = console.log;

(()=>{
	var proxy = new Proxy({}, {
		get(target, key, receiver) {
			return `<span data-key='${key}'>${target}</span>`;
		}
	});
	Object.defineProperty(proxy,"age",{value:"年龄", enumerable:true, configurable:true,writable:true});
	proxy.name = "sdfsa";
	proxy.age = 'asd'
	log(proxy.time);	//<span data-key='time'>[object Object]</span>
	log(proxy.name);	//<span data-key='name'>[object Object]</span>
	log(proxy.title); 	//<span data-key='title'>[object Object]</span>
	log(Object.getOwnPropertyDescriptors(proxy))	//{ name:{ value: 'sdfsa',writable: true,enumerable: true,configurable: true } }
	
	for(let key in proxy){
		log(key,proxy[key]);
	}
})();
(()=>{
	var proxy = new Proxy({}, {
		get(target, key, receiver) {
			return `<span data-key='${key}'>${target[key]}</span>`;
		},
		set(target, key, value,receiver){
			return Reflect.set(target, key, `TEST-${value}`,receiver);
		}
	});
	
	proxy.name = 'profile';
	proxy.time = '2017/9/9';
	proxy.action = 'download';
	log(proxy.time);	//<span data-key='time'>TEST-2017/9/9</span>
	log(proxy.name);	//<span data-key='name'>TEST-profile</span>
	log(proxy.action); 	//<span data-key='action'>TEST-download</span>
})();
//同一个拦截器函数，可以设置拦截多个操作。
console.log("\n**********************设置多个拦截器**********************");
(()=>{
	var handler = {
		get: function(target, name) {
			if (name === 'prototype') {
				return Object.prototype;
			}
			return 'Hello, ' + name;
		},

		apply: function(target, thisBinding, args) {
			return args[0];
		},

		construct: function(target, args) {
			return {value: args[1]};
		}
	};

	var fproxy = new Proxy(function(x, y) {
		return x + y;
	}, handler);

	log(fproxy(1, 2));	//1
	log(new fproxy(1,2));	// {value: 2}
	log(fproxy.prototype === Object.prototype);	// true
	log(fproxy.foo);	// "Hello, foo"
})();

log("\n**********************使用拦截器实现去重排序**********************");
(()=>{
	let createArray = (...arr) => {
		let handler = {
			get(target,propKey,receiver){
				target = [...new Set(target)].sort((a,b)=>a>b)
				return Reflect.get(target, propKey, receiver);
			}
		}
		let target = [];
		target.push(...arr);
		return new Proxy(target,handler)
	}
	
	let arr = createArray('a', 'b', 'c','b');
	log(arr)
})();

(()=>{
	let proxy = new Proxy(()=>{},{
		apply(){
			return "this is a proxy"
		}
	});
	
	log(proxy())
})();

(()=>{
	var twice = {
		apply (target, ctx, args) {
			args = args.map(v=>5*v)
			// return Reflect.apply(...arguments) * 2;
			return Reflect.apply(target, ctx, args) * 2;
		}
	};
	function sum (left, right) {
		return left + right;
	};
	var proxy = new Proxy(sum, twice);
	
	log(proxy(1, 2));	// 6
	log(proxy.call(null, 5, 6));	// 22
	log(proxy.apply(null, [7, 8]));	// 30 
})();

log("\n******************this的指向******************");
(()=>{
	const target = {
		m: function () {
			console.log(this === proxy);
			console.log(this === target);
		},
		n(){
			console.log(this === proxy);
			console.log(this === target);
		},
		l:()=>{
			console.log(this === proxy);
			console.log(this === target);
			
		}
	};
	const handler = {};

	const proxy = new Proxy(target, handler);

	target.m() // false true
	target.n() // false true
	target.l() // false false
	log();
	proxy.m()  // true false
	proxy.n()  // true false
	proxy.l()  // false false
})();






























