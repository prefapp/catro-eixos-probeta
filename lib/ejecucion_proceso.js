const {Tarea} = require("catro-eixos-js");

const ES = require("./es.js");

const Parches = require("./parches");

module.exports = class {

	constructor(proceso, args, refProcesador){

		this.proceso = proceso;
		this.args = args;
		this.refProcesador = refProcesador;
		this.fOriginalProcesador = false;

		this.__pre = [];

		this.__parches = [];

		this.__parchearProcesador();
	}

	alijo(args = {}){

		args.forEach(k => this.refProcesador.alijoGlobal.set(k, args[k]));

		return this;

	}

	pre(aRealizar){

		if(!ES.esArray(aRealizar)){

			throw `Se espera un array`

		}

		aRealizar.forEach((a) => {
		
			if(a.tipo == 'proceso'){

				this.__pre.push(() => {

					return this.refProcesador.ejecutar(

						new Tarea(
		
							"",

							{
								proceso: a.proceso,

								...a.args
							}

						)

					)

				})

			}
				

		})


		return this;
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

					case "REESCRITOR_PASO":

						parcheObj = new Parches["reescritor_paso"](
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

		return this.__ejecutarAccionesPre()

		.then(() => {

			return this.refProcesador.ejecutar(

				new Tarea("",

					{
						proceso: this.proceso,

						...this.args
					}

				)

			)

		}).then(({resultados}) => {

			this.__limpiarEjecucion();

			return fn(resultados);

		}).catch((err) => {

			this.__limpiarEjecucion();

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

		this.fOriginalProcesador = f;

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

	__limpiarEjecucion(){

		if(!this.fOriginalProcesador) return;

		Object.defineProperty(

			this.refProcesador,

			"__instanciarProceso",

			{
				value: this.fOriginalProcesador,
		
				configurable: true,
			}

		)

	}

	__ejecutarAccionesPre(){

		return (async () => {

			for(let i = 0; i < this.__pre.length; i++){
				await this.__pre[i]();
			}

		})()

	}


}
