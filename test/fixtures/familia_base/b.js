const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

	parametrosNecesarios(){

		return {

			nombre: String,

			valor: Number

		}

	}

	__r(){

		return [
			"__setVariableGlobal"
		]
	}

	__setVariableGlobal(){

		this.A(this.arg("nombre"), this.arg("valor"))

	}


}
