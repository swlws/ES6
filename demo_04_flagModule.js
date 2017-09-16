"use strict";
/**
name:标签模板
*/

(function(){
	let [name,sex,age] = ["swl","boy",12];
	console.log(`12`);
	console.log`12`;
	
	console.log(`${name} is a ${sex} , the age is ${age}`);
	console.log`${name} is a ${sex} , the age is ${age}`;
	
	let msg = showMessage`${name} is a ${sex} , the age is ${age}`;
	console.log(msg)
	function showMessage(strArr){
		var result = '';
		var i = 1;
		while (i < strArr.length) {
			if (i < arguments.length) {
				result += arguments[i];
			}
			result += strArr[i];
			i++
		}
		return result;
	}
})();

(function(){
	var total = 30;
	passthru`The total is ${total} (${total*1.05} with tax)`;
	
	function passthru(literals,v1,v2) {
		console.log(literals,v1,v2)
	}
	
	asd`The total is ${total} (${total*1.05} with tax)`;
	function asd(strArr,...arr){
		console.log(strArr,arr)
	}
})();

//转义恶意输入，防止恶意代码执行
(function(){
	let sender = '<script>alert("abc")</script>'; // 恶意代码
	let message = SaferHTML`<p>${sender} has sent you a message.</p>`;

	function SaferHTML(templateData) {
		var s = templateData[0];
		console.log(s)
		for (var i = 1; i < arguments.length; i++) {
			var arg = String(arguments[i]);

			// Escape special characters in the substitution.
			s += arg.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;");

			// Don't escape special characters in the template.
			s += templateData[i];
		}
		return s;
	}
})();

(function(){
	
	console.log(String.raw`swl\nsmx`)
})();