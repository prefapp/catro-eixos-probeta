const Probeta = require("../lib/probeta.js");

const {expect} = require("chai");


describe("Test de eventos `en`", function(){

	let P;

	it("Permite iniciar una unidad", function(){

		return new Probeta().init({

			"FamiliaBase": __dirname + "/fixtures/procesos_sincronizacion"
		
		}).then((p) => P = p)

	})

	it("Permite realizar eventos `en` en un proceso", function(){
		
		return P.proceso(

			"FamiliaBase.principal",

		).en(

			"FamiliaBase.principal",

			"__comprobarSlotA",

			{
				proceso: "FamiliaBase.actuador",

				args: {

					slot: "slot_a",
	
					valor: 1
				}
			}


		).en(

			"FamiliaBase.principal",

			"__comprobarSlotB",

			{
				proceso: "FamiliaBase.actuador",

				args: {

					slot: "slot_b",

					valor: 2

				}
			}

		).parches({


		}).test(function(resultados){

		})

	})

})
