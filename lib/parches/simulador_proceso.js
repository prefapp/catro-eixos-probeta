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

                    if(typeof resultados === "function"){

                        this.tarea.resultados = resultados();
                    }
                    else{
					    this.tarea.resultados = resultados;
                    }

					cumplida(this.tarea);

				})

			}

		)

	}

    __ejecutarResultados(resultados){

        return resultados
    }

}
