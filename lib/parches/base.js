module.exports = class {

	constructor(proceso){

		this.proceso = proceso;
	}

	__parcheInstancia(instancia, propiedad, valor){

		Object.defineProperty(instancia, propiedad, {

			value: valor,

			configurable: true

		});

	}


}
