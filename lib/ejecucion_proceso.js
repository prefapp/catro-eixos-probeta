const {Tarea} = require("catro-eixos-js");

const ES = require("./es.js");

const Parches = require("./parches");

module.exports = class {

	constructor(proceso, args, refProcesador){

		this.proceso = proceso;
		this.args = args;
		this.refProcesador = refProcesador;

		this.__parches = [];

		this.__parchearProcesador();
	}
	
	parches(parches = {}){

		Object.keys(parches).forEach((proceso) => {

			const parcheDatos = parches[proceso];

			parcheDatos.forEach((parche) => {

				let parcheObj;

				switch(parche.tipo){
					
					case "SIMULADOR":

						parcheObj = new Parches["simulador_proceso"](
	
							proceso,

							parche					
						);
			
						break;

					case "SHELL":
						parcheObj = new Parches["shell"](

							proceso,

							parche

						);

						break;

				}

				this.__parches.push(parcheObj);
	
			})

		})


		return this;
	}
	
	test(fn){

		if(!ES.esFuncion(fn))
			throw `[PROBETA][test][se esperaba una función]`

		return this.refProcesador.ejecutar(

			new Tarea("",

				{
					proceso: this.proceso,

					...this.args
				}

			)

		).then(({resultados}) => {

			return fn(resultados);

		}).catch((err) => {

			console.log(err)

			throw `[${this.proceso}][${err}]`

		})
	}

	__aplicarParches(proceso, objetoProceso){

		this.__parches.filter((p) => {

			return proceso === p.proceso

		}).forEach((p) => {

			p.parchear(objetoProceso);

		})
		

	}
	
	__parchearProcesador(){
		
		this.__aplicarParcheInstanciacion();

	}

	__aplicarParcheInstanciacion(){

		const f = this.refProcesador.__instanciarProceso;

		let _self = this;

		//console.log(this.refProcesador)

		Object.defineProperty(

			this.refProcesador,

			"__instanciarProceso",

			{
				value: function(proceso, tarea){

					const objetoProceso = f.call(this, proceso, tarea);

					_self.__aplicarParches(proceso, objetoProceso);

					return objetoProceso;
				},

				configurable: true
			}

		)

	}


}
