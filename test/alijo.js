const Probeta = require("../lib/probeta.js")

const {expect} = require("chai")

describe("La probeta controla bien los alijos", function(){

    let P

    before(function(){
    
		return new Probeta().init({

			"FamiliaBase": __dirname + "/fixtures/familia_base"
		
		}).then((p) => P = p)

    })

    it("Testeo proceso base", function(){
    
        return P.proceso(
        
            "FamiliaBase.proceso_alijos",

            {
                cadena: "esto es una cadena"
            }
        
        ).test((resultados) => {
        
            expect("Esto Es Una Cadena")
        
        })

    })

    it("Se puede modificar un alijo", function(){
    
        return P.proceso(
        
            "FamiliaBase.proceso_alijos",

            {
                cadena: "esto es una cadena"
            }
        
        ).test((resultados) => {
        
            expect("Esto Es Una Cadena")
        
        })
    
    
    })

})
