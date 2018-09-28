const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

	parametrosNecesarios(){

		return {

			nombre: String

		}

	}

	__r(){

		return [
			"__recogerVariableGlobal"
		]
	}

	__recogerVariableGlobal(){

		this.resultado("valor", this.A(this.arg("nombre")));

	}


}
