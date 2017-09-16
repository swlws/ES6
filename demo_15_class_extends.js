const log = console.log;

//通过new.targent使得父类不能被实例化
log("\n************** 通过new.targent使得父类不能被实例化 **************");
(()=>{
	class Persion{
		constructor(){
			if(new.target == Persion){
				throw new Error(`this class can not be instanced`)
			}else{
				this.age = 2343;
			}
		}
		getName(){
			return this.name;
		}
		static getClassName(){
			if(typeof this === "function")
				return this.name;
			else
				throw new Error("must be a function");
		}
	}
	class Man extends Persion{
		constructor(name){
			super();
			this.name = name;
		}
	}
	let m = new Man("aMan");
	log(m.age);
	log(m.getName());
	log(Man.getClassName()) ;
})();

//子类中调用父类的方法
log("\n************** 子类中调用父类的方法 **************");
(()=>{
	class Persion{
		toString(){
			return `the presion's name is ${this.name} ,and age is ${this.age}`;
		}
	}
	class Man extends Persion{
		constructor(name,age){
			super();
			this.name = name;
			this.age = age;
		}
		showMan(){
			return super.toString();	//super指向父类的原型
			//return this.toString();	这样也是可以的，此时this指向自身
		}
	}
	
	let m = new Man("swl",2343);
	log(m.showMan())
	
	log(Object.getPrototypeOf(Man) == Persion);//true,通过Object.getPrototypeOf获取类的原型
})();

log("\n************** super **************");
(()=>{
	class A {
		constructor(){
			this.typeName = "A";
		}
		show(){
			log("A")
		}
	}
	class B extends A{
		show(){
			log("B")
		}
		
		pointWho(){
			super.show();	//super指向父类的原型
		}
		
		pointToSlef(){
			this.show();	//指向自身
		}
		
		getTypeName(){
			log(super.typeName)	//super不能访问父类实例上的属性或者方法
		}
	}
	
	new B().pointWho()	//A
	new B().pointToSlef()	//B
	new B().getTypeName()	//undefined
})();

log("\n************** static中的super **************");
//如果super作为对象，用在静态方法之中，这时super将指向父类，而不是父类的原型对象
(()=>{
	class Parent {
		static myMethod(msg) {
			console.log('static', msg);
		}

		myMethod(msg) {
			console.log('instance', msg);
		}
	}

	class Child extends Parent {
		static myMethod(msg) {
			super.myMethod(msg);
		}

		myMethod(msg) {
			super.myMethod(msg);
		}
	}

	Child.myMethod(1); // static 1

	var child = new Child();
	child.myMethod(2); // instance 2
})();

































