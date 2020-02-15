class MProcesoMock{

    constructor(tarea){

        this.tarea = tarea
    }

    ejecutar(){

    }
}

module.exports = class {

	constructor(proceso, args = {}){

        this.proceso = proceso

		this.resultados = args.resultados;

        this.validar = args.validar || false

	}

    async ejecutar(proceso, args){

        if(this.validar){

            try{
                await this.validar(args)
            }
            catch(error){

                const mensaje = `SIMULADOR_MPROCESO (${this.proceso}) -> ERROR (${error})`

                return {

                    resultados: {

                        estado: "KO",

                        error: mensaje
                    }
                }
            }


        }

        if( typeof this.resultados === "function"){

            return {

                resultados: this.resultados(args)
            }
        }
        else{

            return {
            
                resultados: this.resultados

            }

        }

	}

}
