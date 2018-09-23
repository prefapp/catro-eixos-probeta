const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

//	DEPURAR () { return true;}

	parametrosNecesarios(){

		return ["a", "b"]

	}

	__r(){

		return [
			"__sumarDigitos",
			"__restarDigitos",
			"__apuntarResultados"
		]
	}

	__sumarDigitos(){

		this.a("suma", this.arg("a") + this.arg("b"));

	}

	__restarDigitos(){

		if(!this.arg("restar")) return;

		return this.subProceso(

			"FamiliaBase.restador",

			{
				a: this.arg("a"),
				b: this.arg("b")
			}

		).then(({resta}) => {

			this.resultado("resta", resta)
		})

	}

	__apuntarResultados(){

		this.resultado("suma", this.a("suma"));

	}


}
