/**
name:ArrayBuffer
description:通过视图操纵ArrayBuffer

	ArrayBuffer对象：代表内存之中的一段二进制数据，可以通过“视图”进行操作。“视图”部署了数组接口，这意味着，可以用数组的方法操作内存。
	TypedArray视图：共包括9种类型的视图，比如Uint8Array（无符号8位整数）数组视图, Int16Array（16位整数）数组视图, Float32Array（32位浮点数）数组视图等等。
	DataView视图：可以自定义复合格式的视图，比如第一个字节是 Uint8（无符号8位整数）、第二、三个字节是 Int16（16位整数）、第四个字节开始是 Float32（32位浮点数）等等，此外还可以自定义字节序。

*/
console.log(`\n************ 随机生成N个IP地址 ************`);
//随机生成N个IP地址
(()=>{
	let makeIp = (num = 1)=>{
		let rs = [];
		while(num--){
			let ip = new Uint8Array(4);
			for(let i=0;i<ip.byteLength;i++){
				ip[i] = Math.random() * 256;
			}
			rs.push(ip.join("."));
		}
		return rs;
	}

	console.log(makeIp(10))
})();
console.log(`\n************ TypedArray ************`);
(()=>{
	// 创建一个8字节的ArrayBuffer
	var b = new ArrayBuffer(8);

	// 创建一个指向b的Int32视图，开始于字节0，直到缓冲区的末尾
	var v1 = new Int8Array(b);
	
	for(let i=0;i<v1.byteLength;i++){
		v1[i] = Math.random() * 256;
	}
	console.log(v1)
	
	// 创建一个指向b的Uint8视图，开始于字节2，直到缓冲区的末尾
	var v2 = new Int16Array(b);
	console.log(v2)
	// 创建一个指向b的Int16视图，开始于字节2，长度为2
	var v3 = new Int32Array(b);
	console.log(v3)
})();

//判断当前视图是小端字节序，还是大端字节序。
console.log(`\n************ 判断小端字节 ************`);
(()=>{
	const BIG_ENDIAN = Symbol('BIG_ENDIAN');
	const LITTLE_ENDIAN = Symbol('LITTLE_ENDIAN');

	function getPlatformEndianness() {
		let arr32 = Uint32Array.of(0x12345678);
		let arr8 = new Uint8Array(arr32.buffer);
		switch ((arr8[0]*0x1000000) + (arr8[1]*0x10000) + (arr8[2]*0x100) + (arr8[3])) {
			case 0x12345678:
				return BIG_ENDIAN;
			case 0x78563412:
				return LITTLE_ENDIAN;
			default:
				throw new Error('Unknown endianness');
		}
	}
	console.log(getPlatformEndianness())
})();
console.log(`\n************ 判断小端字节（2） ************`);
(()=>{
	var littleEndian = (function() {
		var buffer = new ArrayBuffer(2);
		new DataView(buffer).setInt16(0, 256, true);
		return new Int16Array(buffer)[0] === 256;
	})();
	console.log(littleEndian)	//如果返回true，就是小端字节序；如果返回false，就是大端字节序。
})();

console.log(`\n************ BYTES_PER_ELEMENT ************`);
(()=>{
	const TYPELENGTH = [
		Int8Array.BYTES_PER_ELEMENT, // 1
		Uint8Array.BYTES_PER_ELEMENT, // 1
		Int16Array.BYTES_PER_ELEMENT, // 2
		Uint16Array.BYTES_PER_ELEMENT, // 2
		Int32Array.BYTES_PER_ELEMENT, // 4
		Uint32Array.BYTES_PER_ELEMENT, // 4
		Float32Array.BYTES_PER_ELEMENT, // 4
		Float64Array.BYTES_PER_ELEMENT // 8
	]
	console.log(TYPELENGTH)
})();

console.log(`\n************ 字符串与Unicode编码的相互转化 ************`);
(()=>{
	// ArrayBuffer转为字符串，参数为ArrayBuffer对象
	function ab2str(buf) {
		return String.fromCharCode.apply(null, new Uint16Array(buf));
	}

	// 字符串转为ArrayBuffer对象，参数为字符串
	function str2ab(str) {
		var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
		var bufView = new Uint16Array(buf);
		for (var i = 0, strLen = str.length; i < strLen; i++) {
			bufView[i] = str.charCodeAt(i);
		}
		return buf;
	}
	
	console.log(str2ab('swl'));
	console.log(ab2str(str2ab('swl')))
})();

//判断是否包含汉字
console.log(`\n************ 判断是否包含汉字 ************`);
(()=>{
	const [BEGIN,END] = [0x4E00,0x9FBF];	//汉字起始和结束
	
	let hasChinese = (str)=>{
		let flag = false;
		[...str].map((value,index,arr)=>{
			let key = arr.join('').charCodeAt(index);	//返回指定位置的字符的 Unicode 编码。这个返回值是 0 - 65535 之间的整数。
			if(key >= BEGIN && key <= END){
				flag = true;
			}
		})
		return flag;
	}
	
	console.log(hasChinese('abcd123孙'))
})();

/**
name:typedArray
property:
	BYTES_PER_ELEMENT	//返回占有的字节数
	TypedArray.prototype.buffer	//TypedArray实例的buffer属性，返回整段内存区域对应的ArrayBuffer对象。该属性为只读属性。
	TypedArray.prototype.length	//表示TypedArray数组含有多少个成员
	TypedArray.prototype.byteLength	//返回TypedArray数组占据的内存长度，单位为字节。
	TypedArray.prototype.byteOffset	//返回TypedArray数组从底层ArrayBuffer对象的哪个字节开始
	
method:
	TypedArray.prototype.copyWithin(target, start[, end = this.length])
	TypedArray.prototype.entries()
	TypedArray.prototype.every(callbackfn, thisArg?)
	TypedArray.prototype.fill(value, start=0, end=this.length)
	TypedArray.prototype.filter(callbackfn, thisArg?)
	TypedArray.prototype.find(predicate, thisArg?)
	TypedArray.prototype.findIndex(predicate, thisArg?)
	TypedArray.prototype.forEach(callbackfn, thisArg?)
	TypedArray.prototype.indexOf(searchElement, fromIndex=0)
	TypedArray.prototype.join(separator)
	TypedArray.prototype.keys()
	TypedArray.prototype.lastIndexOf(searchElement, fromIndex?)
	TypedArray.prototype.map(callbackfn, thisArg?)
	TypedArray.prototype.reduce(callbackfn, initialValue?)
	TypedArray.prototype.reduceRight(callbackfn, initialValue?)
	TypedArray.prototype.reverse()
	TypedArray.prototype.slice(start=0, end=this.length)
	TypedArray.prototype.some(callbackfn, thisArg?)
	TypedArray.prototype.sort(comparefn)
	TypedArray.prototype.toLocaleString(reserved1?, reserved2?)
	TypedArray.prototype.toString()
	TypedArray.prototype.values()
	TypedArray.prototype.set()	//TypedArray数组的set方法用于复制数组（普通数组或TypedArray数组），也就是将一段内容完全复制到另一段内存。
								//set方法还可以接受第二个参数，表示从b对象的哪一个成员开始复制a对象。
	TypedArray.prototype.subarray()	//对于TypedArray数组的一部分，再建立一个新的视图。(功能类似与substring)
*/

console.log(`\n************ 复合视图 ************`);
(()=>{
	function ab2str(buf,constructor) {
		return String.fromCharCode.apply(null, new constructor(buf));
	}
	
	let buffer = new ArrayBuffer(24);
	let idView = new Uint32Array(buffer, 0, 1);
	let usernameView = new Uint16Array(buffer, 4, 8);
	let amountDueView = new Float32Array(buffer, 20, 1);
	
	let [id,name,amount] = [979623074,'swl孙',23.78];
	idView[0] = id;
	for(let i = 0;i<usernameView.byteLength;i++){
		usernameView[i] = name.charCodeAt(i);
	}
	amountDueView[0] = amount;
	
	let getRsData = (buffer,dataView) => {
		if(Object.is(buffer,null) || Object.is(dataView,null)){
			return `buffer or dataView can't be null`;
		}
		let constructorType = Object.prototype.toString.call(dataView).slice(8,-1);
		let constructor = getTypeArrayConstructor(constructorType);
		if(Object.is(constructor,null)){
			return `constructor can't be null`;
		}
		let [begin,end] = [dataView.byteOffset,dataView.byteOffset+Uint16Array.BYTES_PER_ELEMENT * dataView.byteLength];
		return String.fromCharCode.apply(null,new constructor(buffer.slice(begin,end)));	
	}
	let getTypeArrayConstructor = (type) => {
		let rs = null;
		switch(type){
			case 'Uint16Array': rs = Uint16Array;break;
			case 'Uint32Array': rs = Uint32Array;break;
			case 'Float32Array': rs = Float32Array;break;
			default:rs = null;break;
		}
		return rs;
	}
	console.log(getRsData(buffer,idView))
	console.log(idView)
})();

console.log(`\n************ DataView视图 ************`);
(()=>{
	var buffer = new ArrayBuffer(24);
	var dv = new DataView(buffer);

	// 在第1个字节，以大端字节序写入值为25的32位整数
	dv.setInt32(0, 25, false);	//false 大端字节序 true 小端字节序 默认：false

	// 在第5个字节，以大端字节序写入值为25的32位整数
	dv.setInt32(4, 25);

	// 在第9个字节，以小端字节序写入值为2.5的32位浮点数
	dv.setFloat32(8, 2.5,true);
	
	var v1 = dv.getInt32(0);
	var v2 = dv.getInt32(4);
	var v3 = dv.getFloat32(8,true);
	console.log(v1,v2,v3)
})();

















































