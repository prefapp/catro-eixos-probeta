const escritor = require("../lib/escritor");

const {expect} = require("chai");

const vm = require("vm");

const fs = require("fs");

describe("Test de escritor", function(){

	before(function(){

		fs.mkdirSync("/tmp/foo");
		fs.mkdirSync("/tmp/foo/lib");
		fs.mkdirSync("/tmp/foo/lib/procesos");

	})


	it("interpola bien en un proceso", function(){

		let p = escritor.escribirProceso(

			{

				proceso: "Familia.proceso_a",

				__raw__: true

			}


		)

		expect(p.match("require")).to.be.an("array");
		expect(p.match("__r()")).to.be.an("array");

		//evaluamos el código generado
		const m = new vm.Script(p);

	})

	it("Interpola bien la probeta de un escritor", function(){

		let pp = escritor.escribirProcesoProbeta(

			{
				proceso: "Familia.proceso_a",

				__raw__: true

			}

		)

		expect(pp.match(/Test de Familia.proceso_a/)).to.be.an("array");
		expect(pp.match(/\"Familia.proceso_a\"/)).to.be.an("array");

		const m = new vm.Script(pp);

	})

	it("Escribe el proceso en la ruta correcta", function(){

		let p = escritor.escribirProceso(

			{

				proceso: "Familia.proceso_a",

				RUTA: "/tmp/foo/lib/procesos"

			}


		)

		expect(fs.existsSync("/tmp/foo/lib/procesos/familia/proceso_a.js")).to.equal(true)

	})

	it("Escribe la probeta en la ruta correcta", function(){


	})
})
