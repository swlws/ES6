/**
name:let 
description:
	1.没有变量提升。
	2.块作用域。
	3.for语句视为一个作用域
	4.必须先定义在使用，如let x = x;这种会报错。
*/
"use strict";

(function(){
	let a = 1;
	(function(){
		let a = 2;
		console.log(a);
	})();
})();

//for语句视为一个作用域
(function(){
	var a = [];
	for (let i = 0; i < 10; i++) {
	  a[i] = function () {
		console.log(i);
	  };
	}
	a[6](); // 6
})();

//for的特殊使用
(function(){
	for(let i = 0;i<3;i++){
		let i = "abc";
		console.log(i)
	}
	for(let i = 0;i<3;i++){
		console.log(i)
	}
	
})();

//只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
(function(){
	var a = "temp";
	if(true){
		//console.log(a);	//ReferenceError 
		let a = "abc";
	}
})();

(function(){
	{
		let f = function(){return 2;}
		let t = f();
		t = t * t + 1;
		console.log(t)
	}
})();

(function(){
	let a = "a";
	console.log(a);
	{
		let a = "ab";
		console.log(a);
		{
			let a = "abc";
			console.log(a);
			{
				let a = "abcd";
				console.log(a);
			}
			console.log("outer "+a);
		}
		console.log("outer "+a);
	}
	console.log("outer "+a);
})();