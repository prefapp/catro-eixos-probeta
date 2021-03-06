const Probeta = require("../lib/probeta.js");

const {expect} = require("chai");


describe("Test de una unidad de proceso", function(){

	let P;

	it("Permite iniciar una unidad", function(){

		return new Probeta().init({

			"FamiliaBase": __dirname + "/fixtures/familia_base"
		
		}).then((p) => P = p)

	})

	it("Permite realizar un subproceso simulado", function(){
		
		return P.proceso(

			"FamiliaBase.a",

			{
				a: 1,
				b: 1,
				restar: true,
			}

		).parches({

			"FamiliaBase.restador": [

				{
					tipo: "SIMULADOR",


                    validar: async (tarea) => {

                        expect(Number.isInteger(tarea.args.a)).to.equal(true)

                        expect(Number.isInteger(tarea.args.b)).to.equal(true)

                    },
                        
					resultados: {

						resta: 999

					}

				}

			]


		}).test(function(resultados){

			expect(resultados.resta).to.equal(999);

		})

	})

	it("Permite reescribir un paso de un proceso", function(){

		return P.proceso(

			"FamiliaBase.a",

			{
				a: 1,
				b: 1,
				restar: true,
			}

		).parches({

			"FamiliaBase.restador": [

				{
					tipo: "REESCRITOR_PASO",

					paso: "__restarDigitos",

					codigo: function(){

						this.a("resta", this.arg("a") + this.arg("b"))

					}

				}

			]


		}).test(function(resultados){

			expect(resultados.resta).to.equal(2);

		})
	})

    it("Permite simular un proceso de módulo", function(){
    
		return P.proceso(

			"FamiliaBase.c",

			{
                cadena: "abcd"
			}

		).parches({

			"externo#FamiliaCadenas.aMayusculas": [{

				tipo: "SIMULADOR_MPROCESO",

				resultados: function(args){

                    return {
                        
                        cadena: args.cadena.toUpperCase()

                    }
				}

            }]


		}).test(function(resultados){

            expect(resultados.cadena).to.equal("ABCD")

		})
    
    })

})
