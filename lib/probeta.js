const ES = require("./es.js");

const {init} = require("catro-eixos-js");

const EjecucionProceso = require("./ejecucion_proceso.js");

module.exports = class {

	constructor(){

		this.refProcesador = null;
	
		this.ejecuciones = [];
	}

	init(entrada){

		if(ES.esFuncion(entrada)){
			return this.__iniciarDesdeInit(entrada);
		}
		else if(ES.esObjeto(entrada)){
			return this.__iniciarDesdeObjeto(entrada);
		}
		else{
			throw `[PROBETA][init][se esperaba un objeto o una función]`
		}
	}

	proceso(nombre, args){

		const e = new EjecucionProceso(

			nombre,

			args,

			this.refProcesador

		)

		return e;

	}

	__iniciarDesdeInit(initFuncion){

		return initFuncion().then((refProcesador) => {

			this.refProcesador = refProcesador;

			return this;

		})

	}

	__iniciarDesdeObjeto(initObjeto){

		return init(initObjeto).then((refProcesador) => {

			this.refProcesador = refProcesador;

			return this;
	
		})

	}

}
