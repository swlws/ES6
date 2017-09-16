/**
name:Object
*/
"use strict";

//Object的简略写法，变量名作为key，值未value
(function(){
	let name = 'swl',age=20,sex='boy';
	let persion = {name,age,sex};
	console.log(persion)	//{ name: 'swl', age: 20, sex: 'boy' }
	
	let setPersion = (name,age,sex) => ({name,age,sex})
	console.log(setPersion(name,age,sex))	//{ name: 'swl', age: 20, sex: 'boy' }
})();
console.log("\n****************this in Object(ES6)****************");
//ES6 this指向方法定义的地方
(() => {
	let name = "swl";
	let getName = () => this.name;
	let obj = {
		name,getName,setName(name){this.name = name}
	}
	console.log(obj)
	console.log(obj.getName()) //undefined
	obj.setName("mmm")
	console.log(obj.getName()) //undefined
})();
console.log("\n****************this in Object(ES5)****************");
//ES5 this指向方法的调用者
(function(){
	var obj = {
		name:"swl",
		setName:function(name){
			this.name = name;
		},
		getName:function(){
			return this.name;
		}
	}
	console.log(obj)
	console.log(obj.getName()) //swl
	obj.setName("mmm")
	console.log(obj.getName()) //mmm
})();

console.log("\n****************[Attribute name expression]****************");
//ES6 允许字面量定义对象时，用方法二（表达式）作为对象的属性名，即把表达式放在方括号内
(()=>{
	var lastWord = 'last word';
	let propKey = 'foo';
	var a = {
		'first word': 'hello',
		[lastWord]: 'world',
		[propKey]: true,
		['a' + 'bc']: 123
	};

	a['first word'] // "hello"
	a[lastWord] // "world"
	a['last word'] // "world"
	
	console.log(a)
})();
console.log("\n");
//注意，属性名表达式如果是一个对象，默认情况下会自动将对象转为字符串[object Object]，这一点要特别小心。
(()=>{
	const keyA = {a: 1};
	const keyB = {b: 2};

	const myObject = {
		[keyA]: 'valueA',
		[keyB]: 'valueB'
	};
	console.log(myObject)	// Object {[object Object]: "valueB"}
})();

console.log("\n****************Object.is()****************");
//它用来比较两个值是否严格相等，与严格比较运算符（===）的行为基本一致。
(()=>{
	Object.is('foo', 'foo')
	// true
	Object.is({}, {})
	+0 === -0 //true
	NaN === NaN // false

	Object.is(+0, -0) // false
	Object.is(NaN, NaN) // true
})();

console.log("\n****************Object.assign()****************");
//合并对象 Object.assign(target[,target,source1,source2...])
//如果只有一个参数，Object.assign会直接返回该参数。如果该参数不是对象，则会先转成对象，然后返回。由于undefined和null无法转成对象，所以如果它们作为参数，就会报错。
//
(()=>{
	let target = { a: 1 };

	let source1 = { b: 2 };
	let source2 = { c: 3 };

	Object.assign(target, source1, source2);
	console.log(target)  // {a:1, b:2, c:3}
	
})();

//Object.assign方法实行的是浅拷贝，而不是深拷贝。也就是说，如果源对象某个属性的值是对象，那么目标对象拷贝得到的是这个对象的引用。 (不实用，还是自己封装深拷贝比较好)
(()=>{
	let a = Object.assign([1, 2, 3], [4, 5]);
	console.log(a);	//[4,5,3] Object.assign把数组视为属性名为0、1、2的对象，因此源数组的0号属性4覆盖了目标数组的0号属性1。
})();

//Object.assign()的使用
(()=>{
	//克隆对象，自身属性和继承的属性
	function clone(origin) {
		let originProto = Object.getPrototypeOf(origin);
		return Object.assign(Object.create(originProto), origin);
	}
	
	//设置属性
	class Point {
		constructor(option) {
			Object.assign(this, option);
		}
	}
	let a = new Point({name:"swl",age:12});
	console.log(a)

})();
console.log("\n****************Object.getPrototypeOf()****************");
(()=>{
	Object.getPrototypeOf([]) === Array.prototype //true
	Object.getPrototypeOf(1) === Number.prototype // true
	Object.getPrototypeOf('foo') === String.prototype // true
	Object.getPrototypeOf(true) === Boolean.prototype // true
})();

console.log("\n****************Object.setPrototypeOf()****************");
//设置原型属性
(()=>{
	let obj = {name:"swl",age:20};
	obj.__proto__.Sname = "sdfasfsd";	//Object.getPrototypeOf() 不能获取这种方式的设置
	obj[Symbol("symbol")] = "this is a symbol";
	Object.setPrototypeOf(obj,{type:"this is a Object"});	//设置原型属性
	
	console.log(obj)
	console.log("\n----for in----")
	for(let pro in obj){
		if(!obj.hasOwnProperty(pro))	//判断是否是原型属性
			console.log(pro+" : "+obj[pro])
	}
	
	console.log("\n----Object.getPrototypeOf()----")
	console.log(Object.getPrototypeOf(obj));	//获取原型属性
	
	console.log("\n----Object.getOwnPropertyDescriptors()----")
	console.log(Object.getOwnPropertyDescriptors(obj));	//获取自身属性
	
	console.log("\n----Object.getOwnPropertyNames()----")
	console.log(Object.getOwnPropertyNames(obj))
	
	console.log("\n----Object.getOwnPropertySymbols()----")
	console.log(Object.getOwnPropertySymbols(obj));	//获取自身Symbol属性
	for(let key of Object.getOwnPropertySymbols(obj)){
		console.log(key ,obj[key])
	}
	
	console.log("\n----Reflect.ownKeys()----")
	console.log(Reflect.ownKeys(obj))	//获取非原型属性 [ 'name', 'age', Symbol(symbol) ]
})();

console.log("\n****************Null传导符****************");
/**
似乎未实现

Null 传导运算符”有四种用法:
	obj?.prop // 读取对象属性
	obj?.[expr] // 同上
	func?.(...args) // 函数或对象方法的调用
	new C?.(...args) // 构造函数的调用
*/
(()=>{
	// const firstName = message?.body?.user?.firstName || 'default';
	// console.log(firstName)
})();






























