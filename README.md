# ES6
doc and demo for ES6 

#### **前言：** 
#### 前段时间在整理有关于ES6的文档，一边学习，一边总结。大致列出的一个提纲，自己对ES6的理解，仅供大家参考学习。

---
#### eg：Man继承自Persion
```
const log = console.log;

class Persion{
	constructor(name,age){
		this.name = name;
		this.age = age;
	}
	toString(){
		return `the presion's name is ${this.name} ,and age is ${this.age}`;
	}
	static getDesc(){
		return 'this is Persion class'
	}
}
class Man extends Persion{
	constructor(name,age){
		super(name,age);
	}
	toString(){
		return super.toString();	//super指向父类的原型
	}
	static getOwnDesc(){
		return super.getDesc();
	}
}

let m = new Man("swl",2343);
log(m.toString())	//the presion's name is swl ,and age is 2343
log(Man.getOwnDesc())  //this is Persion class
log(Man.getDesc())	//this is Persion class
```
### supper
####supper：既可以当方法用，也可以当做对象使用。
 - 1. super作为函数调用时，代表父类的构造函数。ES6规定，**必须在子类的constructor中调用一次supper，否则，报错。**
 - 2. super作为对象使用时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类。
	
### extends
####extends A
A可以是多种类型的值，只要A具有prototype就可以。由于函数都有prototype属性（除了Function.prototype函数），因此A可以是任意函数。

---
#### **声明：**参考自自阮一峰老师《ES6入门》，有兴趣的可以去看下，url：http://es6.ruanyifeng.com/
#### **备注：**时间关系，关于ES6的更新不会很快。如有需要完整文档的，可以留下邮箱，单独发送>_<
