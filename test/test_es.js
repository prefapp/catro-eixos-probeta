const es = require("../lib/es.js");

const {expect} = require("chai");

describe("Test de es", function(){

	it("Testea correctamente una funcion", function(){

		expect(es.esFuncion(function(){})).to.equal(true);

		expect(es.esFuncion(new class {})).to.equal(false);

		expect(es.esFuncion("string")).to.equal(false);

		expect(es.esFuncion(null)).to.equal(false);

		expect(es.esFuncion(1.5)).to.equal(false);

		expect(es.esFuncion(new RegExp(/\w/))).to.equal(false);

	})

	it("Testea correctamente que es un objeto", function(){

		expect(es.esObjeto({})).to.equal(true);

		expect(es.esObjeto(function(){})).to.equal(false);

		expect(es.esObjeto("string")).to.equal(false);

		expect(es.esObjeto(1.5)).to.equal(false);

		expect(es.esObjeto(true)).to.equal(false);

	})
})
