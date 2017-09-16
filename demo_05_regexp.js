"use strict";

/**
name:RegExp
*/

(function(){
	let reg = new RegExp(/^swl/ig,'i');
	let rs = reg.test("swl name");
	console.log(rs)
})();

(function(){
	let a = 3.1415;
	console.log(Number.parseInt(a))
})();