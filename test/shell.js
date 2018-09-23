const Probeta = require("../lib/probeta.js");

const {expect} = require("chai");


describe("Test de shell", function(){

	let P;

	it("Permite iniciar una unidad", function(){

		return new Probeta().init({

			"FamiliaShell": __dirname + "/fixtures/shell"
		
		}).then((p) => P = p)

	})

	it("Permite realizar un comandoShell normal", function(){

		return P.proceso(

			"FamiliaShell.ls",

			{
				flags: ["-lhart"],

				ruta: "/proc"
			}

		).parches({

		}).test(function({salida}){

			expect(salida).to.be.an("array");

		})

	})

	it("Permite realizar un comandoShell simulado y evaluarlo", function(){

		return P.proceso(

			"FamiliaShell.ls",

			{
				flags: ["-lhart"],

				ruta: "/proc"
			}

		).parches({

			"FamiliaShell.ls": [

				{
					tipo: "SHELL",

					evaluar: function({proceso, paso}, {comando, args, opciones}){

						expect(proceso).to.equal("FamiliaShell.ls");
						expect(paso).to.equal("__ls");

						expect(comando).to.equal("/bin/ls");
						expect(args).to.be.an("array");
						expect(args[0]).to.equal("-lhart");

					},

					resultados: function({proceso, paso}, {comando, args, opciones}){


						expect(proceso).to.equal("FamiliaShell.ls");
						expect(paso).to.equal("__ls");

						expect(comando).to.equal("/bin/ls");
						expect(args).to.be.an("array");
						expect(args[0]).to.equal("-lhart");

						return "LINEA"
					}
				}

			]

		}).test(function({salida}){

			expect(salida).to.be.an("array");

			expect(salida[0]).to.equal("LINEA");

		})

	})

})
