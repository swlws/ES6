"use strict";

(function(){
	function add(a,b){
		console.log(typeof b);
		a = a || 5;
		b = b || 10;
		console.log(typeof b);
		console.log(a,b)
		
	}
	add(10)
})();

(function(){
	let x = 100;
	function add(y=x+10){
		console.log(y);
	}
	add()
	add(50)
})();

(function(){
	let [x,y] = [10,20]
	function add([x,y]){
		console.log("解构")
		console.log(x,y);
	}
	add([y,x]);
	
	function sub({x:a,y:b=50}){
		console.log(a,b)
	}
	sub({x:19})
	sub({x:19,y:1})
})();

(function(){
	// 写法一
	function m1({x = 0, y = 0} = {}) {
		return [x, y];
	}

	// 写法二
	function m2({x, y} = { x: 0, y: 0 }) {
		return [x, y];
	}

	// 函数没有参数的情况
	m1() // [0, 0]
	m2() // [0, 0]

	// x和y都有值的情况
	m1({x: 3, y: 8}) // [3, 8]
	m2({x: 3, y: 8}) // [3, 8]

	// x有值，y无值的情况
	m1({x: 3}) // [3, 0]
	m2({x: 3}) // [3, undefined]

	// x和y都无值的情况
	m1({}) // [0, 0];
	m2({}) // [undefined, undefined]

	m1({z: 3}) // [0, 0]
	m2({z: 3}) // [undefined, undefined]
})();

console.log("\n**************null undefined************\n");
//如果传入undefined，将触发该参数等于默认值，null则没有这个效果。
(function(){
	function aa(x=1,y=10,z){
		console.log(x,y)
	}
	let x=null,y=undefined;
	aa(x,y)
	
})();

console.log("\n**************length************\n");
//如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
(function(){
	(function (a) {}).length; // 1
	(function (a = 5) {}).length; // 0
	(function (a, b, c = 5) {}).length; // 2
	(function (a = 0, b, c) {}).length; // 0
	(function (a, b = 1, c) {}).length; // 1
})();

console.log("\n**************函数形参************\n");
(function(){
	let foo = "outer";
	
	let funcc = x => x;
	console.log(funcc(foo)); //outer
	
	function bar(func = x => foo){
		let foo = "inner";
		console.log(func())
	}
	bar(); //outer
	
	function qwe(foo,func=function(){foo = "middle"}){ //func不改变zoo外部和内部变量的值
		var foo='inner';  //注意这个foo和函数参数中的foo不是同一个变量，互不干扰;不能用let声明foo，会报错
		func()
		console.log(foo)
	}
	qwe();
	
	function zoo(foo,func=function(){foo = "middle"}){ //func不改变zoo外部和内部变量的值
		foo='fsfas'
		func()
		console.log(foo)
	}
	zoo(); //middle
})();


console.log("\n**************name************\n");

//name
(function(){
	let func  =function(){}
	console.log(func.name);	//func
	
	(new Function).name; // "anonymous"
	
	function foo() {};
	foo.bind({}).name; // "bound foo"

	(function(){}).bind({}).name; // "bound "
})();


console.log("\n**************箭头函数************\n");
(function(){
	let getRs = (x,y) =>{
		if(x>5) return x;
		else return y;
	}
	console.log(getRs(10,20))
	
	getRs = ({first,last}) => ({first,last});
	console.log(getRs({first:"Wenlong",last:"Sun"}))
	
	
})();

console.log("\n**************回调函数************\n");
(function(){
	let arr = [1,2,3,4];
	let rs = arr.filter(x => {if(x>2) return x;} )
	console.log(arr,rs)
})();

console.log("\n**************this************\n");
//函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。
(function(){
	function foo() {
		setTimeout(() => {
			console.log("\n**************定时器 begin************");
			console.log(this)
			console.log('id:', this.id);//id:42
			console.log("**************定时器 end************");
		}, 100);
		var that = this;
		setTimeout(function(){
			console.log("\n**************定时器 begin************");
			console.log(that)
			console.log('id:', that.id);  //id:21
			console.log("**************定时器 end************");
		},100)
	}

	var id = 21;

	foo.call({ id: 42 });
})();


//this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是外层代码块的this。正是因为它没有this，所以也就不能用作构造函数。
(function(){
	console.log("&&&&&&&&&&&&&&&&&&&&&&")
	function func(){
		console.log("this: "+this.toString())
		let showName = func =>{
			func(()=>{
				console.log("name: "+this.name); //swl
			})
			
		}
		showName((func)=>{func()})
	}
	func.call({name:"swl"})
	console.log("&&&&&&&&&&&&&&&&&&&&&&")
})();

//this指向的固定化
(function(){
	function foo() {
		return () => {
			return () => {
				return () => {
					console.log('id:', this.id);
				};
			};
		};
	}

	var f = foo.call({id: 1});

	var t1 = f.call({id: 2})()(); // id: 1
	var t2 = f().call({id: 3})(); // id: 1
	var t3 = f()().call({id: 4}); // id: 1
})();

console.log("\n**************嵌套的箭头函数************\n");
(function(){
	const pipeline = (...funcs) =>val => funcs.reduce((a, b) => b(a), val);   // =>之前的是函数的参数

	const plus1 = a => a + 1;
	const mult2 = a => a * 2;
	const mult3 = a => a * 3;
	const addThenMult = pipeline(plus1, mult2,mult3);

	console.log(addThenMult(5));
})();

(function(){
	function pipeline(...funcs){
		return function (val){
			console.log("val: "+val)
			return funcs.reduce(function(a,b){  //reduce第一次调用时a指向val，b指向func的第一个元素
				return b(a);
			},val)
		}
	}
	
	function plus1(a){
		return a+1;
	}
	function mult2(a){
		return a*2;
	}
	
	var addThenMult = pipeline(plus1, mult2);
	console.log(addThenMult(5));
})();

























