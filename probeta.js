#!/usr/bin/env node

const {escritor} = require("./index.js");

const {ArgumentParser} = require("argparse");

const fs = require("fs");

const parser = new ArgumentParser({

	version: '0.0.2',

	addHelp: true,

	description: "Sistema de apoyo al desarrollo con catro-eixos-js"

})

const subparser = parser.addSubparsers({

	title: "subcomandos",

	dest: "cmd"

})

const proceso = subparser.addParser("proceso", {

	addHelp: true,

	description: "Agrega un proceso al proyecto",

	help: "Permite agregar un proceso al proyecto"
})


proceso.addArgument(

	["-n", "--nombre"],

	{
		action: "store",
	
		addHelp: true,

		help: "Establece el nombre del proceso a agregar",

		required: true
	}

)

proceso.addArgument(

	"-t",

	{
		action: "storeConst",

		constant: "con-probeta", 

		addHelp: true,

		help: "Agrega una unidad de test (probeta) al proceso"
	}

)

const probeta = subparser.addParser("probeta", {

	addHelp: true,

	description: "Agrega una probeta (test) a un proceso",

	help: "Permite agregar una probeta (test) a un proceso"

})

probeta.addArgument(

	["-n", "--nombre"],

	{
		action: "store",
	
		addHelp: true,

		help: "Establece el nombre del proceso del que crear una probeta",

		required: true

	}
)

const test = subparser.addParser("test", {

	addHelp: true,

	description: "Realiza un test unitario",

	help: "Permite realizar un test unitario de un proceso"

});

test.addArgument(
	
	["-p", "--proceso"],

	{
		action: "store",

		addHelp: true,

		help: "Nombre del proceso a testear",

		required: true
	}

)


const args = parser.parseArgs();


const acciones = {

	test: function(){

		

	},

	proceso: function(args){

		if(!args.nombre)
			error(`[proceso]: Falta el nombre del proceso a agregar`)

		if(!args.nombre.match(/^([A-Z1-9])(\w+)\.(\w+)$/)){
			error(`[proceso]: El nombre del proceso no es correcto: [Familia.nombre]`)
		}

		if(!process.env["PROBETA_PROYECTO_HOME"])		
			error(`[proceso]: la variable de entorno 'PROBETA_PROYECTO_HOME' no está definida`)

		try{

			escritor.escribirProceso({

				proceso: args.nombre,

				RUTA: process.env["PROBETA_PROYECTO_HOME"] + "/lib/procesos"

			})

			console.log(args)

			if(args.t === "con-probeta"){

				acciones.probeta(args);

			}

		}
		catch(err){
			error(`[proceso]: se ha producido un error ${err}`)
		}

	},

	probeta: function(args){

		if(!args.nombre)
			error(`[proceso-probeta]: Falta el nombre del proceso de la probeta a agregar`)

		if(!args.nombre.match(/^([A-Z1-9])(\w+)\.(\w+)$/)){
			error(`[proceso-probeta]: El nombre del proceso no es correcto: [Familia.nombre]`)
		}

		if(!process.env["PROBETA_PROYECTO_HOME"])		
			error(`[proceso-probeta]: la variable de entorno 'PROBETA_PROYECTO_HOME' no está definida`)

		if(!fs.existsSync(process.env["PROBETA_PROYECTO_HOME"] + "/test")){

			error(`[proceso-probeta]: no existe fichero de test`)
		}

		if(!fs.existsSync(process.env["PROBETA_PROYECTO_HOME"] + "/test/procesos")){

			error(`[proceso-probeta]: no existe fichero de test/procesos`)
		}

		try{

			escritor.escribirProcesoProbeta({

				proceso: args.nombre,

				RUTA: process.env["PROBETA_PROYECTO_HOME"] + "/test/procesos"

			})
		}
		catch(err){

			error(`[proceso]: se ha producido un error ${err}`)

		}

	}


}

acciones[args.cmd](args);

function error(err){

	console.log("\x1b[31m", err);
	console.log("\x1b[0m", "");

	process.exit(1);
	

}


