"use strict"

/**
name:数组解构
discription:
*/
console.log("**************************************");
console.log("**************数组解构****************");
console.log("**************************************");
(function(){
	let [a,b,c] = [1,2,3];
	console.log(a,b,c);
	
	let [d,...e] = [11,22,33,];
	console.log(d,e);
})();

//默认值
//注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。
(function(){
	let [foo = true] = [];
	console.log(foo);

	//let [x, y = 'b'] = ['a']; // x='a', y='b'
	let [x, y = 'b',z] = ['a',undefined,12]; // undefined或者不写任何东西，默认值才生效
	console.log(x,y,z);
})();

//如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。
(function(){
	function a(){
		console.log("**");
		return 5;
	}
	
	let [aa=a()] = [];  //会输出“**”
	let [bb=a()] = [1];  //不会输出“**”
	
	console.log(aa)
})();

/**
name:对象解构
*/
console.log("**************************************");
console.log("**************对象解构****************");
console.log("**************************************");
(function(){
	let { foo } = { foo: "aaa", bar: "bbb" };
	console.log(foo)	///aaa
	
	let { foo: bar ,bar:foe} = { foo: "aaa", bar: "bbb" };
	console.log(bar,foe)	//aaa bbb
	
	let obj = {
		p: [
			'Hello',
			{ y: 'World' }
		]
	};

	let { p: [x, { y }] } = obj;
	console.log(x,y)	//Hello World
})();

//下面代码有三次解构赋值，分别是对loc、start、line三个属性的解构赋值。注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都是模式，不是变量。
(function(){
	var node = {
		loc: {
			start: {
				line: 1,
				column: 5
			}
		}
	};

	var { loc, loc: { start }, loc: { start: { line }} } = node;
	console.log(line);	// 1
	console.log(loc);	// Object {start: Object}
	console.log(start);	// Object {line: 1, column: 5}
})();

/**
name:嵌套解析
*/
console.log("**************************************");
console.log("**************嵌套解构****************");
console.log("**************************************");
(function(){
	let obj = {};
	let arr = [];

	({ foo: obj.prop, bar: arr[0] } = { foo: 123, bar: true });
	
	console.log(obj) // {prop:123}
	console.log(arr) // [true]
})();

/**
name:字符串解构
discription:解构赋值的规则是，只要等号右边的值不是对象或数组，就先将其转为对象。由于undefined和null无法转为对象，所以对它们进行解构赋值，都会报错。
*/
console.log("**************************************");
console.log("**************字符串解构****************");
console.log("**************************************");

(function(){
	let str = "qwert"
	let [a,b,c,d] = str;
	let {length:len} = str;
	console.log(a,b,c,d,len)
})();


/**
name:函数传参
*/
console.log("**************************************");
console.log("**************函数传参****************");
console.log("**************************************");
(function(){
	function add({x:a=10,y:b=13}){
		return a+b;
	}
	console.log(add({x:5}))
	function div([x=10,y=5]){
		return x/y;
	}
	console.log(div([]))
})();

/**
name：应用
*/
(function(){
	let jsonData = {
		id: 42,
		status: "OK",
		data: [867, 5309]
	};
	let {id,status,data:number} = jsonData;
	console.log(id,status,number)
	
	
	var map = new Map();
	map.set('first', 'hello');
	map.set('second', 'world');
	
	for(let item of map){
		console.log(item)
	}
	
	for(let [key,value] of map){
		console.log(key,value)
	}
})();

