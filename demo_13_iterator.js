/**
name:Iterator
Iterator 的遍历过程是这样的。
	创建一个指针对象，指向当前数据结构的起始位置。也就是说，遍历器对象本质上，就是一个指针对象。
	第一次调用指针对象的next方法，可以将指针指向数据结构的第一个成员。
	第二次调用指针对象的next方法，指针就指向数据结构的第二个成员。
	不断调用指针对象的next方法，直到它指向数据结构的结束位置。
	
原生具备 Iterator 接口的数据结构如下。
	Array
	Map
	Set
	String
	TypedArray
	函数的 arguments 对象
*/

(()=>{
	let makeIterator = (arr)=>{
		let index = 0;
		return {
			next:()=>{
				let len = arr.length;
				let done = true;
				if(index < len){
					done = false;
				}
				return {
					val:arr[index++],
					done
				}
			},
			clear:()=>{
				arr = [];
			}
		}
	}
	var it = makeIterator(['a', 'b']);
	let val = {};
	val = it.next() // { value: "a", done: false }
	console.log(val)
	it.clear();
	val = it.next() // { value: "b", done: false }
	console.log(val)
	val = it.next() // { value: undefined, done: true }
	console.log(val)
})();

console.log("\n********************Iterator的获取********************");
(()=>{
	let str = "asfjsaf";
	let it = str[Symbol.iterator]();
	let obj = null;
	while(true){
		obj = it.next();
		console.log(obj);
		if(obj.done){
			break;
		}
	}
})();
console.log("\n********************Iterator和解构********************");
(()=>{
	let set = new Set([123,234,123,54,123,234,534,6]);
	let [...arr] = set;
	console.log(arr)
	
	let map = new Map([["name","swl"],["age",23]]);
	for(let [key,value] of map){
		console.log(key+" : "+ map.get(key))
	}
})();
console.log("\n********************for...of...和for...in...********************");
(()=>{
	console.log("************Array for...of...************");
	let arr = [345,234,35,1432,6546,23];
	arr.key = "this is a key"
	for(let val of arr){
		console.log(val)
	}
	console.log("************Array for...in...************");
	for(let key in arr){
		console.log(key)
	}
	
	let obj = {name:"swl",age:12,sex:"boy"};
	// for(let val of obj){	//Object不能使用for...of...遍历，因为它不具备Iterator接口，但是自己可以为他加Iterator接口
		// console.log(val)
	// }
	console.log("************Array for...in...************");
	for(let key in obj){	
		console.log(key)
	}
})();


















