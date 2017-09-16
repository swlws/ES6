
const log = console.log;


log(`********************* Generator��װ�첽���� *********************`);
(()=>{
	var fetch = require('node-fetch');

	function* gen(){
		var url = 'https://api.github.com/users/github';
		var result = yield fetch(url);
		log(result.bio);
	}

	var g = gen();
	var result = g.next();
	log(result)

	result.value.then(function(data){	//fetch���ص���һ��Promise����
		return data.json();
	}).then(function(data){
		g.next(data);
	});
})();

