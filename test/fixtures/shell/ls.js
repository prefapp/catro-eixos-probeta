const {Proceso} = require("catro-eixos-js");


module.exports = class extends Proceso{

	parametrosNecesarios(){

		return {

			flags: Array,

			ruta: String

		}

	}

	__r(){

		return [
		
			"__ls"
		]

	}

	__ls(){

		return this.comandoShell(

			"/bin/ls",

			[
				...this.arg("flags"),

				this.arg("ruta")
			]

		)

	}

	OK__ls(salida){

		this.resultado("salida", salida.split(/\n/));
	}

}
