const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

	parametrosNecesarios(){

	    return {

            cadena: String

        }

	}

	__r(){

		return [

            "__partirCadena",

            "__capitalizar",

            "__apuntarResultados"

		]
	}

    __partirCadena(){

        this.a("fragmentos", this.arg("cadena").split(/\s+/))

    }

    __capitalizar(){

        this.a(
            
            "fragmentos_mayusculas", 
        
            this.a("fragmentos").map((f) => {
            
                return f.split('').slice(0, 1)[0].toUpperCase() + 

                    f.split('').slice(1).join("")
            
            })
        
        )

    }
    
    __apuntarResultados(){

        this.resultado("salida", this.a("fragmentos_mayusculas").join(" "))
    }

}
