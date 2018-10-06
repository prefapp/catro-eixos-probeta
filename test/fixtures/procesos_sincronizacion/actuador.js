const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

	parametrosNecesarios(){

		return {

			slot: String,
			valor: Number

		}

	}

	__r(){

		return [
		
			"__cubrirSlot"
		]

	}

	__cubrirSlot(){

		console.log("EIQUI")

		this.A(this.arg("slot"), this.arg("valor"))

	}

}
