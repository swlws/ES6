
(()=>{
	let name = Symbol();
	let obj = {name:"swl"};
	obj[name] = "symbol"
	console.log(obj)
	console.log(obj[name],obj['name'],obj.name)
})();

console.log();
(()=>{
	let s1 = Symbol("aaa");
	let s2 = Symbol("aaa");
	
	console.log(Object.is(s1,s2));	//false 每个Symbol都是独一无二的
})();

console.log();
//如果 Symbol 的参数是一个对象，就会调用该对象的toString方法，将其转为字符串，然后才生成一个 Symbol 值。
(()=>{
	const obj = {
		toString() {
			return 'this is function toString';
		}
	};
	const sym = Symbol(obj);
	console.log(sym);	// Symbol(abc)
})();

console.log();
(()=>{
	let log = console.log;
	log.levels = {
		DEBUG: Symbol('debug'),
		INFO: Symbol('info'),
		WARN: Symbol('warn')
	};
	log(log.levels.DEBUG, 'debug message');
	log(log.levels.INFO, 'info message');
})();


(()=>{
	function getArea(shape, options) {
		var area = 0;

		switch (shape) {
			case 'Triangle': // 魔术字符串
				area = .5 * options.width * options.height;
			break;
			/* ... more code ... */
		}

		return area;
	}

	let a = getArea('Triangle', { width: 100, height: 100 }); // 魔术字符串
	console.log(a)
})();

(()=>{
	let key = Object.is(Symbol.for('swl'),Symbol.for('swl'));
	console.log(key)	//true
		
})();





























