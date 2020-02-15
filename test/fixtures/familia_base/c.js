const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

    DEPURAR(){

        return true
    }


	parametrosNecesarios(){

		return {

			cadena : String,

		}

	}

	__r(){

		return [

			"__llamarModuloExterno",

            "__apuntarResultados"

		]
	}

    __llamarModuloExterno(){

        return this.mProceso(
        
            "externo#FamiliaCadenas.aMayusculas",

            {
                cadena: this.arg("cadena")
            }
        
        )

    }

    __apuntarResultados({cadena}){

        this.resultado("cadena", cadena)
    }

}
