const Probeta = require("../lib/probeta.js")

const {expect} = require("chai")

describe("La probeta controla bien los alijos globales", function(){

    let P

    before(function(){
    
		return new Probeta().init({

			"FamiliaBase": __dirname + "/fixtures/familia_base"
		
		}).then((p) => P = p)

    })

    it("Permite establecer valores en el alijo global", function(){
    
        return P.proceso(
        
            "FamiliaBase.recoger_global",

            {
                nombre: "__VALOR_A__"
            }
        
        ).alijoGlobal({
        
            "__VALOR_A__": 66
        
        }).test((resultados) => {
        
            expect(resultados.valor).to.equal(66)
        
        })

    })

    it("Permite restaurar el alijo global", function(){
    
        return P.proceso(
        
            "FamiliaBase.recoger_global",

            {
                nombre: "__VALOR_A__",

            }
        
        ).RESET_ALIJO_GLOBAL()
            
         .test((resultados) => {
        
            expect(resultados.valor).to.equal(undefined)
        
        })
    
    })


})
