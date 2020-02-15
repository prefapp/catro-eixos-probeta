const ParcheBase = require("./base");

module.exports = class extends ParcheBase{

	constructor(proceso, args = {}){

		super(proceso);

		this.resultados = args.resultados;

        this.validar = args.validar || false

	}

	parchear(objetoProceso){

		const resultados = this.resultados;

        const validar = this.validar

		this.__parcheInstancia(

			objetoProceso,

			"ejecutar", 

			async function(){

                if(validar){

                    try{
                        await validar(this.tarea)
                    }
                    catch(error){


                        const mensaje = `SIMULADOR (${this.tarea.args.proceso} -> VALIDAR: ${error})`

                        console.log(mensaje)

                        this.tarea.resultados.estado = "KO"
                        this.tarea.resultados.error = mensaje

                        return this.tarea

                    }
                }

                if(typeof resultados === "function"){

                    this.tarea.resultados = resultados();
                }
                else{
				    this.tarea.resultados = resultados;
                }

                return this.tarea
			}

		)

	}

    __ejecutarResultados(resultados){

        return resultados
    }

}
