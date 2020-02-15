const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

	parametrosNecesarios(){

	    return {

        }

	}

	__r(){

		return [

            "__previo",

            "__a",

            "__b",

            "__c",

            "__d",

            "__e",

            "__apuntarResultados"
		]
	}

    __previo(){

        return ""

    }

    __a(cadena){

        return cadena + "A"
    }

    __b(cadena){

        return cadena + "B"
    }

    __c(cadena){

        return cadena + "C"
    }

    __d(cadena){

        return cadena + "D"
    }

    __e(cadena){

        return cadena + "E"
    }

    __apuntarResultados(cadena){

        this.resultado("salida", cadena)

    }
}
