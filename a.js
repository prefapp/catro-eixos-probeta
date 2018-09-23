class a{

	constructor(nombre){

		this.nombre = nombre;
	}

	saludar(){

		console.log("HOLA, " + this.nombre)

	}

}

class b extends a{}

let o = new b("Fran");

const f = o.saludar;

console.log(f)

Object.defineProperty(o, "saludar", {

	value: function(){

		console.log("A dice: ");

		f.apply(this);

	}

})

o.saludar();






//class a{
//
//	saludar(){
//
//		console.log("HOLA")
//	}
//
//}
//
//let o = new a();
//let oo = new a();
//
//o.saludar();
//
//Object.defineProperty(o, "saludar", {
//
//	value: function(){
//		console.log("HELLO")
//	}
//
//})
//
//o.saludar();
//oo.saludar();
//
//
//new a().saludar();
