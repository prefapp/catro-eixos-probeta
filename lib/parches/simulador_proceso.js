const ParcheBase = require("./base");

module.exports = class extends ParcheBase{

	constructor(proceso, args = {}){

		super(proceso);

		this.resultados = args.resultados;

	}

	parchear(objetoProceso){

		const resultados = this.resultados;

		this.__parcheInstancia(

			objetoProceso,

			"ejecutar", 

			function(){

				return new Promise((cumplida, falla) => {

					this.tarea.resultados = resultados;

					cumplida(this.tarea);

				})

			}

		)

	}

}
