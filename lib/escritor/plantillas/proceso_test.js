module.exports = `

const {expect} = require("chai");

const {probeta} = require("catro-eixos-probeta");

describe("Test de <PROCESO>", function(){

	let P;

	before(function(){

		return new probeta().init(
	
			require("../../lib/init.js")

		).then((p) => {

			P = p;

		})

	})

	it("<PROCESO> funciona", function(){

		return P.proceso(

			"<PROCESO>",

			{

			}

		).parches({


		}).test(function(resultados){


		})

	})

})

`
