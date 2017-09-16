/**
name:Generator
description:
	从语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。

*/


const log = console.log;

console.log(`\n************ Symbol.iterator ************`);
(()=>{
	let arr = ['a','b','c'];
	let gen = arr[Symbol.iterator]()
	console.log(gen.next())
	console.log(gen.next())
	console.log(gen.next())
	console.log(gen.next())
	console.log(gen.next())
})();

console.log(`\n************ Generator ************`);
(()=>{
	function* he(){
		yield 'hello';
		yield 'world';
		return 'ending';
		yield 'hello world';
	}
	let a = he();
	log(a.next())
	log(a.next())
	log(a.next())
	log(a.next())
})();

//惰性执行，只有调用next()时，才会执行下一个地址的代码
/*console.log(`\n************ 惰性执行 ************`);
(()=>{
	function* f() {
		console.log('执行了！');
		yield 'one';
		console.log('执行了！');
		yield 'two';
		console.log('执行了！');
		yield 'three';
	}

	var generator = f();

	let interval = setInterval(function () {
		let rs = generator.next()
		if(rs.done)
			clearInterval(interval)
	}, 500);
})();*/


//另外需要注意，yield表达式只能用在 Generator 函数里面，用在其他地方都会报错。
//console.log(`\n************ 惰性执行 ************`);
(()=>{
	/*var arr = [1, [[2, 3], 4], [5, 6]];

	var flat = function* (a) {
		a.forEach(function (item) {
			if (typeof item !== 'number') {
				yield* flat(item);	//会报错
			} else {
				yield item;	//会报错
			}
		});
	};

	for (var f of flat(arr)){
		console.log(f);
	}*/
})();

console.log(`\n************ 转化数组 ************`);
(()=>{
	var arr = [1, [[2, 3], 4], [5, 6]];
	var flat = function* (a) {
		var length = a.length;
		for (var i = 0; i < length; i++) {
			var item = a[i];
			if (typeof item !== 'number') {
				yield* flat(item);
			} else {
				yield item;
			}
		}
		return 'end'
	};
	let a = flat(arr)
	// console.log(a.next());
	for (var f of flat(arr)) {
		console.log(f);
	}
})();

//yield表达式如果用在另一个表达式之中，必须放在圆括号里面。yield表达式用作函数参数或放在赋值表达式的右边，可以不加括号。
console.log(`\n`);
(()=>{
	function* demo() {
		foo(yield 'a', yield 'b'); // OK
		let input = yield; // OK
	}
	function* demo() {
		// console.log('Hello' + yield); // SyntaxError
		// console.log('Hello' + yield 123); // SyntaxError

		console.log('Hello ' + (yield 222)); // OK
		console.log('world ' + (yield 123)); // OK
	}
	
	let a = demo();
	console.log(a.next())
	console.log(a.next())
	console.log(a.next())
	console.log(a.next())
})();

//yield表达式本身没有返回值，或者说总是返回undefined。next方法可以带一个参数，该参数就会被当作上一个yield表达式的返回值。
console.log(`\n***************** yield的参数 ***************** `);
(()=>{
	function* f() {
		for(var i = 0; true; i++) {
			var reset = yield i;
			if(reset) { i = -1; }
		}
	}

	var g = f();

	console.log(g.next())	//0
	console.log(g.next())	//1
	console.log(g.next())	//2
	console.log(g.next(1))	//0
	console.log(g.next(1))	//0
	console.log(g.next(1))	//0
	console.log(g.next())	//1
	console.log(g.next())	//2
	console.log(g.next())	//3
})();

//Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。
console.log();
(()=>{
	function* foo(x) {
		var y = 2 * (yield (x + 1));
		var z = yield (y / 3);
		return (x + y + z);
	}

	var a = foo(5);
	console.log(a.next()) // Object{value:6, done:false}
	console.log(a.next()) // Object{value:NaN, done:false}
	console.log(a.next()) // Object{value:NaN, done:true}

	var b = foo(5);
	console.log(b.next()) // { value:6, done:false }
	console.log(b.next(12)) // { value:8, done:false }
	console.log(b.next(13)) // { value:42, done:true }	x=5;y=24;z=13
})()

console.log();
(()=>{
	function* dataConsumer() {
		console.log('Started');
		console.log(`1. ${yield 'one'}`);
		console.log(`2. ${yield 'two'}`);
		return 'result';
	}

	let genObj = dataConsumer();
	console.log(genObj.next());
	// Started
	// console.log(genObj.next('a'))
	// 1. a
	// console.log(genObj.next('b'))
})();

console.log(`\n***************** for...of...遍历 ***************** `);
//这里需要注意，一旦next方法的返回对象的done属性为true，for...of循环就会中止，且不包含该返回对象，所以上面代码的return语句返回的6，不包括在for...of循环之中。
(()=>{
	function *foo() {
		yield 1;
		yield 2;
		yield 3;
		yield 4;
		yield 5;
		return 6;
	}

	for (let v of foo()) {
		console.log(v);	//不输出6
	}
})();

console.log(`\n***************** throw ***************** `);
(()=>{
	var g = function* () {
		try {
			yield;
		} catch (e) {
			console.log('内部捕获', e);
		}
	};

	var i = g();
	i.next();
	try {
		i.throw('a');
		i.throw('b');
	} catch (e) {
		console.log('外部捕获', e);
	}
	// 内部捕获 a
	// 外部捕获 b
})();

//如果 Generator 函数内部没有部署try...catch代码块，那么throw方法抛出的错误，将被外部try...catch代码块捕获。
(()=>{
	var g = function* () {
		while (true) {
			yield;
			console.log('内部捕获', e);
		}
	};

	var i = g();
	i.next();

	try {
		i.throw('a');
		i.throw('b');
	} catch (e) {
		console.log('外部捕获', e);
	}
	// 外部捕获 a
})();

//throw方法被捕获以后，会附带执行下一条yield表达式。也就是说，会附带执行一次next方法。
(()=>{
	var gen = function* gen(){
		try {
			yield console.log('a');
		} catch (e) {
			// ...
		}
		yield console.log('b');
		yield console.log('c');
	}

	var g = gen();
	g.next() // a
	g.throw() // b
	g.next() // c
})();

//外部捕获Generator内部的错误
(()=>{
	function* foo() {
		var x = yield 3;
		var y = x.toUpperCase();
		yield y;
	}

	var it = foo();

	it.next(); // { value:3, done:false }

	try {
		it.next(42);
	} catch (err) {
		console.log(err);
	}
})();

console.log(`\n***************** return ***************** `);
(()=>{
	function* gen() {
		yield 1;
		yield 2;
		yield 3;
	}

	var g = gen();

	console.log(g.next() )       // { value: 1, done: false }
	console.log(g.return('foo')) // { value: "foo", done: true }
	//g.return()	// { value: undefined, done: true }
	console.log(g.next())        // { value: undefined, done: true }
})();
//如果 Generator 函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。
(()=>{
	function* numbers () {
		yield 1;
		try {
			yield 2;
			yield 3;
		} finally {
			yield 4;
			yield 5;
		}
		yield 6;
	}
	
	console.log()
	var g = numbers();
	console.log(g.next()) // { value: 1, done: false }
	console.log(g.next()) // { value: 2, done: false }
	console.log(g.return(7)) // { value: 4, done: false }
	console.log(g.next()) // { value: 5, done: false }
	console.log(g.next()) // { value: 7, done: true }
})();

console.log(`\n***************** yield* 表达式 ***************** `);
(()=>{
	function* inner() {
		yield 'hello!';
	}

	function* outer1() {
		yield 'open';
		yield inner();
		yield 'close';
	}

	var gen = outer1()
	console.log(gen.next().value) // "open"
	console.log(gen.next().value) // 返回一个遍历器对象
	console.log(gen.next().value) // "close"
})();

//从语法角度看，如果yield表达式后面跟的是一个遍历器对象，需要在yield表达式后面加上星号，表明它返回的是一个遍历器对象。这被称为yield*表达式。
console.log();
(()=>{
	function* A(){
		yield 'abcd';
	}
	function* B(){
		yield 'aa';
		yield* A();
		yield 'bb';
	}
	
	for(let ele of B()){
		console.log(ele)
	}
})();

//如果yield*后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员。
console.log();
(()=>{
	function* gen(){
		yield* ["a", "b", "c"];
	}
	
	console.log(gen().next()) // { value:"a", done:false }
})();

//使用扩展运算符时，优先打印yield之外的部分
console.log();
(()=>{
	function* genFuncWithReturn() {
		yield 'a';
		console.log(123)
		yield 'b';
		return 'The result';
	}
	function* logReturned(genObj) {
		let result = yield* genObj;
		console.log(result);
	}

	let log = logReturned(genFuncWithReturn())
	console.log([...log])
	// for(let ele of log){
		// console.log(ele)
	// }
})();

console.log(`***************** demo 遍历二叉树 *****************`);
(()=>{
	// 下面是二叉树的构造函数，
	// 三个参数分别是左树、当前节点和右树
	function Tree(left, label, right) {
		this.left = left;
		this.label = label;
		this.right = right;
	}

	// 下面是中序（inorder）遍历函数。
	// 由于返回的是一个遍历器，所以要用generator函数。
	// 函数体内采用递归算法，所以左树和右树要用yield*遍历
	function* inorder(t) {
		if (t) {
			yield* inorder(t.left);
			yield t.label;
			yield* inorder(t.right);
		}
	}

	// 下面生成二叉树
	function make(array) {
		// 判断是否为叶节点
		if (array.length == 1) return new Tree(null, array[0], null);
		return new Tree(make(array[0]), array[1], make(array[2]));
	}
	let tree = make([[['a'], 'b', ['c']], 'd', [['e'], 'f', ['g']]]);

	// console.log(tree)
	//遍历二叉树
	console.log([...inorder(tree)])
	
})();

console.log(`***************** 作为对象属性的Generator函数 *****************`);
(()=>{
	let obj = {
		* myGeneratorMethod() {
			//···
		}
	};
	//等价于
	let obj2 = {
		myGeneratorMethod: function* () {
			// ···
		}
	};
})();


//ES6 规定这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的prototype对象上的方法。
//返回的不是this对象
console.log(`***************** Generator的this *****************`);
(()=>{
	function* F() {
		this.a = 1;
		yield this.b = 2;
		yield this.c = 3;
	}
	var obj = {};
	var f = F.call(obj);	//将this绑定到新的Object上

	console.log(f.next());  // Object {value: 2, done: false}
	console.log(f.next());  // Object {value: 3, done: false}
	console.log(f.next());  // Object {value: undefined, done: true}

	console.log(obj.a) // 1
	console.log(obj.b) // 2
	console.log(obj.c) // 3
})();

console.log(`***************** this绑定到自身 *****************`);
(()=>{
	function* F() {
		this.a = 1;
		yield this.b = 2;
		yield this.c = 3;
	}
	var f = F.call(F.prototype);	//将this绑定到Generator自身的原型上

	console.log(f.next());  // Object {value: 2, done: false}
	console.log(f.next());  // Object {value: 3, done: false}
	console.log(f.next());  // Object {value: undefined, done: true}

	console.log(f.a) // 1
	console.log(f.b) // 2
	console.log(f.c) // 3
})();

console.log(`***************** new Generator *****************`);
(()=>{
	function* gen() {
		this.a = 1;
		yield this.b = 2;
		yield this.c = 3;
	}
	function F(){
		return gen.call(gen.prototype)
	}

	let f = new F();
	console.log(f.next());  // Object {value: 2, done: false}
	console.log(f.next());  // Object {value: 3, done: false}
	console.log(f.next());  // Object {value: undefined, done: true}

	console.log(f.a) // 1
	console.log(f.b) // 2
	console.log(f.c) // 3
})();

console.log(`***************** Generator与状态机 *****************`);
(()=>{
	
	let clock = function() {
		let ticking = true;
		return ()=>{
			let status = '';
			if (ticking)
				status = 'Tick!';
			else
				status = 'Tock!';
			ticking = !ticking;
			return status;
		}
	}
	
	let machine2 = clock();
	console.log(machine2())
	console.log(machine2())
	
	console.log()
	let clock2 = function* () {
		while (true) {
			yield 'Tick!';			
			yield 'Tock!';
		}
	};
	
	let machine = clock2();
	console.log(machine.next())
	console.log(machine.next())
})();

//利用 Generator 函数，可以在任意对象上部署 Iterator 接口。
console.log(`***************** 部署Iterator接口 *****************`);
(()=>{
	function* iterEntries(obj) {
		let keys = Object.keys(obj);
		for (let i=0; i < keys.length; i++) {
			let key = keys[i];
			yield [key, obj[key]];
		}
	}

	let myObj = { foo: 3, bar: 7 };

	for (let [key, value] of iterEntries(myObj)) {
		console.log(key, value);
	}
	
	for (let obj in myObj) {
		console.log(obj)
	}
})();












































