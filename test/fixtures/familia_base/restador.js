const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

	parametrosNecesarios(){

		return ["a", "b"]

	}

	__r(){

		return [
			"__restarDigitos",
			"__apuntarResultados"
		]
	}

	__restarDigitos(){

		this.a("resta", this.arg("a") - this.arg("b"));

	}

	__apuntarResultados(){

		this.resultado("resta", this.a("resta"));

	}


}
