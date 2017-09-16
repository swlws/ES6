/**
name:Set
description:Set中值唯一，不存在相等的两个值。
prototype:
	Set.prototype.constructor：构造函数，默认就是Set函数。
	Set.prototype.size：返回Set实例的成员总数。
method:
	add(value)：添加某个值，返回Set结构本身。
	delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
	has(value)：返回一个布尔值，表示该值是否为Set的成员。
	clear()：清除所有成员，没有返回值。
	keys()：返回键名的遍历器
	values()：返回键值的遍历器
	entries()：返回键值对的遍历器
	forEach()：使用回调函数遍历每个成员
*/

//从Set转化为Array的两种方式
(()=>{
	let set = new Set(["name","age","sex"]);
	let arr1 = Array.from(set);
	let arr2 = [...set];
	
	console.log(arr1,arr2)
})();

console.log("\n**************去重排序**************");
(()=>{
	let getArr = (arr) => [...new Set(arr)].sort((a,b)=>a>b)
	let rs = getArr([5,2,1,2,6,22,6,3]);
	console.log(rs)
})();

console.log("\n**************并集、交集、差集**************");
(()=>{
	let a = new Set([1, 2, 3]);
	let b = new Set([4, 3, 2]);

	// 并集
	let union = new Set([...a, ...b]);
	// Set {1, 2, 3, 4}

	// 交集
	let intersect = new Set([...a].filter(x => b.has(x)));
	// set {2, 3}

	// 差集
	let difference = new Set([...a].filter(x => !b.has(x)));
	// Set {1}
})();


/**
name:Map
description:
prototype:
	Map.prototype.constructor：构造函数，默认就是Map函数。
	Map.prototype.size：返回Map实例的成员总数。
method:
	Map.prototype.set(key, value)
		设置Map对象中键的值。返回该Map对象。
	Map.prototype.get(key)
		返回键对应的值，如果不存在，则返回undefined。
	Map.prototype.has(key)
		返回一个布尔值，表示Map实例是否包含键对应的值。
	Map.prototype.delete(key)
		移除任何与键相关联的值，并且返回该值，该值在之前会被Map.prototype.has(key)返回为true。之后再调用Map.prototype.has(key)会返回false。	
	Map.prototype.clear()
		移除Map对象的所有键/值对 。
	Map.prototype.keys()
		返回一个新的 Iterator对象， 它按插入顺序包含了Map对象中每个元素的键 。
	Map.prototype.values()
		返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的值 。
	Map.prototype.entries()
		返回一个新的 Iterator 对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
	Map.prototype.forEach(callbackFn[, thisArg])
		按插入顺序，为 Map对象里的每一键值对调用一次callbackFn函数。如果为forEach提供了thisArg，它将在每次回调中作为this值。
	Map.prototype[@@iterator]()
		返回一个新的Iterator对象，它按插入顺序包含了Map对象中每个元素的 [key, value] 数组。
*/

(()=>{
	let map = new Map([["name","swl"],["age",12],["sex","boy"]]);
	for(let [key,value] of map){
		console.log(key+" : "+ map.get(key))
	}
})();

console.log("\n**************Map filter 混用**************");
(()=>{
	let map = new Map([[1,'a'],[2,'b'],[3,'c']]);
	
	let rs = [...map].filter(([k,v])=>k>2);	//过滤key值大于2的键值对
	console.log(rs)
})();

(()=>{
	
})();


















