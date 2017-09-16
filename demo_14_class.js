/**
name:class
description:
	不存在变量提升
	类中方法实际被定义在原型上
	constructor中可以修改new出的对象的原型
	可以通过class表达式立即执行类
*/

const log = console.log;

(()=>{
	class Point{
		constructor(x,y){
			this.x = x;
			this.y = y;
		}

		doSomething(){
			log(`doSomething...`)
		}
	}

	Object.defineProperty(Point,"age",{value:"年龄", enumerable:true, configurable:true,writable:true});	//
	Object.defineProperty(Point,"sex",{value:"性别", enumerable:true, configurable:true,writable:true});	//
	Object.setPrototypeOf(Point,{showMessage:()=>"this is a message block",count:{value:0}});	//设置原型属性,类似于Point.prototype = ...
	
	let showProperty = (title,obj) =>{
		log(`*****************${title}的各类属性*****************`)
		log(`-------for...in...-------`)
		for(let key in obj){
			log(`key: ${key},val: ${obj[key]}`)
		}
		log(`\n-------Object.getOwnPropertyNames-------`)
		log(Object.getOwnPropertyNames(obj));
		log(Object.getOwnPropertyNames(obj.prototype?obj.prototype:{}));
		
		log(`\n-------Object.getPrototypeOf-------`)
		log(Object.getPrototypeOf(obj));
		
		log(`\n-------Object.getOwnPropertyDescriptors-------`)
		log(Object.getOwnPropertyDescriptors(obj));
		
		log(`\n-------Reflect.ownKeys-------`)
		log(Reflect.ownKeys(obj));
	}
	showProperty("Point",Point);
	showProperty("new Point()",new Point(18,22));
})();

log(`\n***************** constructor *****************`);
(()=>{
	class Foo{
		constructor(key){
			if(!key){
				return Object.create({});
			}
		}
	}
	
	log(`${new Foo(true) instanceof Foo}`) ;
	log(`${new Foo(false) instanceof Foo}`) ;
	try{
		Foo();
	}
	catch(e){
		log(`${e}`)
	}
})();

log(`\n***************** class 表达式 *****************`);
(()=>{
	let Point = class Me{
		getClassName(){
			return Me.name;
		}
	}
	console.log(Point.name,new Point().getClassName())
	
	log(`\n*******立即执行的class 表达式*******`);
	let persion = new class{
		constructor(name){
			this.name = name;
		}
		getPerisonName(){
			return this.name;
		}
	}("swl")
	log(`getPerisonName: ${persion.getPerisonName()}`)
})();

log(`\n***************** this的指向 *****************`);
(()=>{
	class Test{
		constructor(){
			this.printName = this.printName.bind(this);
		}
		print(text){
			log(text)
		}
		printName(name){
			this.print(name);
		}
	}
	
	let t = new Test();
	let {printName} = t;
	printName("fsfdsfsdgfafdsgsdf");	//不通过实例实例调用类的方法时，需要在constructor中绑定this
	t.printName("swl")
})();

log(`\n***************** Static *****************`);
(()=>{
	class Father{
		
		static getFatherClassName(){
			return this.name;
		}
	}
	
	class Child extends Father{
		static getChildClassName(){
			return this.name;
		}
	}
	log(Father.getFatherClassName())	//Father
	
	log(Child.getFatherClassName())	//Child
	log(Child.getChildClassName())	//Child
})();

log(`\n***************** new.target *****************`);
(()=>{
	class Test{
		constructor(name){
			if(new.target === Test){	//不允许任何操作实例化这个类
				throw new Error("can not be instanced");
			}else{
				this._name = name;
			}
		}
	}
	
	class Sub extends Test{
		constructor(name,age){
			super(name);
			this.age = age;
		}
	}
	
	let sub = new Sub("swl",123);
	log(sub._name)
})();


























