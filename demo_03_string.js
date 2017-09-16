"use strict"

/**
name:String
description:repeat、startsWith、endsWith、padStart、padEnd、repeat、charAt
*/
;

//模板字符串
(function(){
	let str = `
	asfasd
	sdf
	sdf
	`
	console.log(str.trim())
})();

// 字符串中嵌入变量
(function(){
	let [name,time] = ["Bob","today"];
	let str = `Hello ${name}, how are you ${time}?`
	console.log(str)
})();

//引用反引号
(function(){
	var greeting = `\`Yo\` World!`;
	console.log(greeting)
})();

(function(){
	const tmpl = addrs => `<xmp>
	<table>
		${addrs.map(addr => `
		<tr><td>${addr.first}</td></tr>
		<tr><td>${addr.last}</td></tr>
		`).join('')}
	</table></xmp>
	`;
	const data = [
		{ first: '<Jane>', last: 'Bond' },
		{ first: 'Lars', last: '<Croft>' },
	];
	// document.write(tmpl(data))
	console.log(tmpl(data));
})();

//重复n次
(function(){
	let str = "swl ";
	let nStr = str.repeat(12);
	console.log(nStr)
})();
