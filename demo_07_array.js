"use strict";
/**
name: array

description:
	新加：扩展运算符	...
*/

(function(){
	var arr = [1,2,3,4];
	console.log(arr)
	console.log(...arr)	//[ 1, 2, 3, 4 ]
	
	function show(...arr){
		console.log("arr:",arr)
		console.log("...arr:",...arr)
	}
	
	show(arr)	//arr: [ [ 1, 2, 3, 4 ] ]	...arr: [ 1, 2, 3, 4 ]
	show(...arr)	//arr: [ 1, 2, 3, 4 ]	...arr: 1 2 3 4
})();
console.log("\n*********************...*********************");
(function(){
	var arr = [3,21,2]
	arr.push(...[123,12])
	console.log(arr)	//[ 3, 21, 2, 123, 12 ]
})();

(function(){
	var arr = [43,123,535,213,64,134,741,75];
	var max = Math.max(...arr);
	console.log(max);	//741
})();

(function(){
	let a,arr;	//一定要给a，arr先定义，否则可以在(function(){})()之外可以调用变量
	[a,...arr] = [42,534,23,656,34,5];
	console.log(a,arr)	
})();
//console.log(a,arr)	

(function(){
	var dateFields = ["2017-7-11 12:12:36","2017-7-14 12:12:36","2017-7-16 12:12:36"];
	console.log(...dateFields)
	var d = new Date(...dateFields);
	console.log(d)
})();

(function(){
	let arrayLike = {
		'0': 'a',
		'1': 'b',
		'2': 'c',
		length: 3
	};

	// TypeError: Cannot spread non-iterable object.
	arrayLike = Array.from(arrayLike);
	let arr = [...arrayLike];
	console.log(arrayLike)
})();

console.log("\n*********************Array.of*********************");
(()=>{
	Array.of(3, 11, 8) // [3,11,8]
	Array.of(3) // [3]
	Array.of(3).length // 1

	Array() // []
	Array(3) // [, , ,]
	Array(3, 11, 8) // [3, 11, 8]
})();
console.log("\n*********************Array.from*********************");
/**
Array.from
	第一个参数：类数组或者数组
	第二个参数：callback 类似于map函数
	第三个参数：this 绑定毁掉函数中的上下文
*/
(function(){
	let res = Array.from([1, , 2, , 3], (n) => n || 0)
	console.log(res)
	
	let typesOf = (...arr) => Array.from(arr,value => typeof value);
	console.log(typesOf(null,[],NaN))
	console.log(typesOf(...[null,[],NaN]))
	
	let transfromLikeArr =  Array.from({ length: 2 }, () => 'jack')
	console.log(transfromLikeArr)
})();

console.log("\n*********************Array.entries() keys() values()*********************");
/**
数组实例的 entries()，keys() 和 values() § ?
*/
(function(){
	let arr = ["a","b"];
	for (let index of arr.keys()) {
		console.log(index);
	}
	// 0
	// 1
	
	// for (let elem of arr.values()) {	//似乎未实现这个API
		// console.log(elem);
	// }
	// 'a'
	// 'b'

	for (let [index, elem] of arr.entries()) {
		console.log(index, elem);
	}
	// 0 "a"
	// 1 "b"
})();


/**
name: Map
方法
	Map.prototype.clear()
		移除Map对象的所有键/值对 。
	Map.prototype.delete(key)
		移除任何与键相关联的值，并且返回该值，该值在之前会被Map.prototype.has(key)返回为true。之后再调用Map.prototype.has(key)会返回false。
	Map.prototype.entries()
		返回一个新的 Iterator 对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
	Map.prototype.forEach(callbackFn[, thisArg])
		按插入顺序，为 Map对象里的每一键值对调用一次callbackFn函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。
	Map.prototype.get(key)
		返回键对应的值，如果不存在，则返回undefined。
	Map.prototype.has(key)
		返回一个布尔值，表示Map实例是否包含键对应的值。
	Map.prototype.keys()
		返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。
	Map.prototype.set(key, value)
		设置Map对象中键的值。返回该Map对象。
	Map.prototype.values()
		返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 。
	Map.prototype[@@iterator]()
		返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
*/
console.log("\n*********************Map*********************");
(function(){
	console.log("Map.length: "+Map.length)
	let map = new Map([[1,'one'],[2,'two'],[3,'three']]);
	for(let [key,val] of map){
		console.log("[key : "+key+" , val : "+val+" ]")
	}
	console.log("\nmap.keys()")
	for(let key of map.keys()){
		console.log("key: "+key)
	}
	console.log("\nmap.values()")
	for(let val of map.values()){
		console.log("val: "+val)
	}
	console.log("\nmap.entries()")
	for(let obj of map.entries()){
		console.log("obj: "+obj)
	}
	console.log("\nforEach")
	map.forEach((val,key)=>{
		console.log("[key : "+key+" , val : "+val+" ]")
	})
})();

/**
name: Set
方法
	Set.prototype.add(value)
		在Set对象尾部添加一个元素。返回该Set对象。
	Set.prototype.clear()
		移除Set对象内的所有元素。
	Set.prototype.delete(value)
		移除Set的中与这个值相等的元素，返回Set.prototype.has(value)在这个操作前会返回的值（即如果该元素存在，返回true，否则返回false）。Set.prototype.has(value)在此后会返回false。
	Set.prototype.entries()
		返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值的[value, value]数组。为了使这个方法和Map对象保持相似， 每个值的键和值相等。
	Set.prototype.forEach(callbackFn[, thisArg])
		按照插入顺序，为Set对象中的每一个值调用一次callBackFn。如果提供了thisArg参数，回调中的this会是这个参数。
	Set.prototype.has(value)
		返回一个布尔值，表示该值在Set中存在与否。
	Set.prototype.keys()
		与values()方法相同，返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。
	Set.prototype.values()
		返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。
	Set.prototype[@@iterator]()
		返回一个新的迭代器对象，该对象包含Set对象中的按插入顺序排列的所有元素的值。
*/
console.log("\n*********************Set*********************");
(function(){
	let set = new Set(["name","age","sex"]);
	for(let val of set){
		console.log(val)
	}
	console.log("\nset.keys()")
	for(let key of set.keys()){
		console.log("key: "+key)
	}
	console.log("\nset.values()")
	for(let val of set.values()){
		console.log("val: "+val)
	}
	console.log("\nset.entries()")
	for(let obj of set.entries()){
		console.log("obj: "+obj)
	}
	console.log("\nforEach")
	set.forEach((val,key)=>{
		console.log("[key : "+key+" , val : "+val+" ]")
	})
})();




















