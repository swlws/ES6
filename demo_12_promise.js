/**
name:Promise
description:Promise具有三个状态，pending（进行中）、resolved[fulfilled]（已完成）、rejected[rejected]（已解决）
method:
	then
	catch
*/

//执行此页的demo时，应该一个一个的执行，避免异步造成的输出混乱

// (()=>{
	// var promise = new Promise((resolve,reject)=>{
		// setTimeout((val)=>{
			// console.log(val)
			// resolve();
		// },500,1);
	// })
	// promise.then(()=>{
		// setTimeout((val)=>{
			// console.log(val)
			// resolve();
		// },500,1);
	// })
// })();


// (()=>{
	// function timeout(ms) {
		// return new Promise((resolve, reject) => {
			// setTimeout(resolve, ms, 'done');	//setTimeout的第三个参数是执行函数的参数
		// });
	// }

	// timeout(100).then((value) => {
		// console.log(value);
	// });
// })();

//将Promise作为resolve的参数
// (()=>{
	// let p1,p2,p3;
	// p1 = new Promise((resolve,reject)=>{
		// setTimeout(()=>{
			// console.log("p1 exec...");
			// reject("p1 error");
		// },1000)
	// }).then(()=>{
		// console.log("p1 resolved")
	// },(err)=>{
		// console.log(err)
	// })
	
	// p2 = new Promise((resolve,reject)=>{	
		// setTimeout(()=>{
			// console.log("p2 exec...");
			// resolve(p1);
		// },1000)
	// }).then(()=>{
		// console.log("p2 resolved")
	// })
	
	// p3 = new Promise((resolve,reject)=>{
		// setTimeout(()=>{
			// console.log("p3 exec...");
			// resolve(p2);
		// },1000)
	// }).then(()=>{
		// console.log("p3 resolved")
	// }).catch(error => console.log(error))
// })();

//无论时resolve还是reject，只要不抛出异常，返回值都作为下一个then的resolve的参数
// (()=>{
	// let p1 = new Promise((resolve,reject)=>{
		// reject(1)
	// }).then((val)=>{
		// console.log("第一个then，val is "+val)
		// return 2;
	// },(err)=>{
		// console.log("第一个then，err is "+err)
		// return 2;
	// }).then((val)=>{
		// console.log("第二个then，val is "+val)
		// return 3;
	// },(err)=>{
		
	// }).then((val)=>{
		// console.log("第三个then，val is "+val)
		// return 		
	// },(err)=>{

	// })
	
// })();

//当then中的resolve和reject抛出异常时，会进入下一个then的reject中
// (()=>{
	// let p1 = new Promise((resolve,reject)=>{
		// reject(1)
	// }).then((val)=>{
		// return 1;
	// },(err)=>{
		// return 1;
	// }).then((val)=>{
		// throw new Error("error happend")
	// },(err)=>{
		// console.log(err)
		// throw new Error("2")
	// }).then((val)=>{
	// },(err)=>{
		// console.log("asd "+err)
		// throw new Error("errorsdfsdfds happend")
		// return;
	// }).then((val)=>{
		
	// },(err)=>{
		// console.log("asdsdasdasd "+err)
		// return;
	// })
	
// })();

//一般而言不要在then中写reject方法，应该在catch中捕获异常，
//Promise 对象的错误具有“冒泡”性质，会一直向后传递，直到被捕获为止。也就是说，错误总是会被下一个catch语句捕获。
/*
(()=>{
	let promise = new Promise((resolve,reject)=>{
		console.log(x+1)
		try{
			throw new Error("this is a error");
		}catch(e){
			
			resolve(e)
		}
	})
	promise.then((val)=>{
		console.log(`第一个then ，val: ${val}`);
		throw new Error("this is a error test");
	}).catch((e)=>{
		console.log(`第一个catch，e：${e}`)
	}).then((val)=>{
		console.log(`第二个then ，val: ${val}`);
		return val;
	}).catch((e)=>{
		console.log(`第二个catch，e：${e}`)
	}).then((val)=>{
		console.log(`第三个then ，val: ${val}`);
		return val;
	}).catch((e)=>{
		console.log(`第三个catch，e：${e}`)
	})
})();
*/


/**
pArr的状态由p1、p2、p3决定，分成两种情况。
	只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
	只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
*/
/*
(()=>{
	let p1 = new Promise((resolve,reject)=>{
		return resolve("p1");
	})
	let p2 = new Promise((resolve,reject)=>{
		return reject("Error Happend in p2")
		return resolve("p2");
	})
	let p3 = new Promise((resolve,reject)=>{
		return resolve("p3");
	})
	
	let pArr = Promise.all([p1,p2,p3]).then((rs)=>{
		console.log(rs)
	}).catch((err)=>{
		console.log(`Error: ${err}`)
	})
	
})();
*/

//done 可以捕获最终reject和resolve的执行结果
/*
(()=>{
	Promise.prototype.done = function (onFulfilled, onRejected) {
		this.then(onFulfilled, onRejected)
		.catch(function (reason) {
			// 抛出一个全局错误
			setTimeout(() => { throw reason }, 0);
		});
	};
	
	let p = new Promise((resolve,reject)=>{
		return resolve(new Error(" happend in resolve"));
		//return reject(new Error(" happend in reject"));
	})
	
	p.then((val)=>{
		return val;
	}).catch((e)=>{
		return e;
	}).done((e)=>{
		console.log(`done ${e}`)
	})
})();
*/

//finally 的参数是个普通函数，不会获取promise的执行结果
(()=>{
	Promise.prototype.finally = function (callback) {
		let P = this.constructor;
		return this.then(
			value  => P.resolve(callback()).then(() => value),
			reason => P.resolve(callback()).then(() => { throw reason })
		);
	};
	
	let p = new Promise((resolve,reject)=>{
		return resolve(new Error(" happend in resolve"));
		//return reject(new Error(" happend in reject"));
	})
	
	p.then((val)=>{
		return val;
	}).catch((e)=>{
		return e;
	}).finally((val)=>{
		console.log(`finally ${val}`)
	})
})();



































































