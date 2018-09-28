const Probeta = require("../lib/probeta.js");

const {expect} = require("chai");


describe("Test de una unidad de proceso con pre", function(){

	let P;

	it("Permite iniciar una unidad", function(){

		return new Probeta().init({

			"FamiliaBase": __dirname + "/fixtures/familia_base"
		
		}).then((p) => P = p)

	})

	it("Permite realizar con pre", function(){
		
		return P.proceso(

			"FamiliaBase.recoger_global",

			{
				nombre: "FOO"
			}

		).pre([

			{
				tipo: "proceso",

				proceso: "FamiliaBase.b",

				args: {

					nombre: "FOO",

					valor: 99
				}
			}


		]).parches().test(function(resultados){

			expect(resultados.valor).to.equal(99);

		})

	})

})
