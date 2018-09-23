const Probeta = require("../lib/probeta.js");

const {expect} = require("chai");


describe("Test de una unidad de proceso", function(){

	let P;

	it("Permite iniciar una unidad", function(){

		return new Probeta().init({

			"FamiliaBase": __dirname + "/fixtures/familia_base"
		
		}).then((p) => P = p)

	})

	it("Permite realizar un test simple", function(){

		return P.proceso(

			"FamiliaBase.a",

			{
				a: 1,
				b: 1
			}

		).test(function(resultados){

			expect(resultados.suma).to.equal(2);

		})

	})

	it("Permite realizar un test con subprocesos", function(){

		return P.proceso(

			"FamiliaBase.a",

			{
				a: 1, 
				b: 2,
				restar: true
			}

		).test(function(resultados){

			expect(resultados.suma).to.equal(3);
			expect(resultados.resta).to.equal(-1);

		})


	})


})
