{
	import { Base } from './OO'
	class Facotry extends Base{
		sayName(){
			console.log(this.name);
			return this;
		}
		setName(name){
			this.name = name;
			return this;
		}
	}

	var f = new Facotry();
	f
		.setName('hello world!')
		.sayName();
}