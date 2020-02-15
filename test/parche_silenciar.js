const Probeta = require("../lib/probeta.js")

const {expect} = require("chai")

describe("La probeta controla bien los alijos globales", function(){

    let P

    before(function(){
    
		return new Probeta().init({

			"FamiliaParches": __dirname + "/fixtures/familias_proceso_sobrecarga"
		
		}).then((p) => P = p)

    })

    it("El proceso base del test es correcto", function(){
    
        return P.proceso(
        
            "FamiliaParches.a",

            {
            }
        
        ).test((resultados) => {
        
            expect(resultados.salida).to.equal("ABCDE")
        
        })

    })

    it("El proceso permite silenciar pasos", function(){
    
        return P.proceso(
        
            "FamiliaParches.a",

            {}
        
        ).silenciarPasos([
        
            "__a",

            "__c"
        
        ]).test((resultados) => {
        
            expect(resultados.salida).to.equal("BDE")
        
        })
    
    
    })

})
