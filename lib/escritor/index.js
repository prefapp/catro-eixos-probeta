const fs = require("fs");

const path = require("path");

function escribirEstructura(args){

	let d = __cargarPlantilla("estructura");

	let pb = __cargarPlantilla("proceso_base");

	let ruta = args.RUTA || false;

	if(!ruta)
		throw `Falta la ruta en la que escribir`;

	__escribirDirectorioEstructura(`${ruta}/lib`);
	__escribirDirectorioEstructura(`${ruta}/lib/procesos`);
	__escribirDirectorioEstructura(`${ruta}/test`);
	__escribirDirectorioEstructura(`${ruta}/test/procesos`);

	__escribirFichero(`${ruta}/lib/init.js`, d, true);

	__escribirFichero(`${ruta}/lib/procesos/base.js`, pb, true);

}

function escribirProceso(args){

	if(!args.proceso)
		throw `escribirProceso: falta argumento \'proceso\'`;

	let d = __cargarPlantilla("proceso");

	d = __interpolarDatos(d, args);

	if(args["__raw__"]) return d;

	let ruta = args.RUTA || false;

	if(!ruta)
		throw `Falta ruta en la que escribir`;
	
	ruta = __resolverRutaProceso(ruta, args["proceso"]);

	if(fs.existsSync(ruta)){
		throw `Ya existe un fichero en ${ruta}. Abortando`
	}

	__crearDirectorioFamilia(ruta);

	__escribirFichero(ruta, d);

	__aviso(`Creado fichero de proceso en ${ruta}`);
	
}

function escribirProcesoProbeta(args){

	let d = __cargarPlantilla("proceso_test");

	d = __interpolarDatos(d, args);

	if(args["__raw__"]) return d;

	let ruta = args.RUTA || false;

	if(!ruta)
		throw `Falta ruta en la que escribir`;

	ruta = __resolverRutaProbetaProceso(ruta, args["proceso"]);

	if(fs.existsSync(ruta)){
		throw `Ya existe un fichero en ${ruta}. Abortando`
	}
	
	__escribirFichero(ruta, d);

	__aviso(`Creado fichero de probeta_proceso en ${ruta}`);

}

function __cargarPlantilla(plantilla){

	return require(`${__dirname}/plantillas/${plantilla}.js`)

}

function __interpolarDatos(plantilla, args){

	Object.keys(args).forEach((k) => {

		const i = new RegExp(

			__escaparRegExp('<' + k.toUpperCase() + '>'),

			"g"
	
		)

		plantilla = plantilla.replace(i, args[k]);	

	})

	return plantilla;
}

function __escaparRegExp(str){

    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); 

}

function __resolverRutaProceso(ruta, proceso){

	let familia = proceso.split(/\./)[0].toLowerCase();
	let nombre_proceso = proceso.split(/\./)[1];


	let r = path.join(ruta, familia, nombre_proceso + ".js");

	return r;

}

function __resolverRutaProbetaProceso(ruta, proceso){

	let familia = proceso.split(/\./)[0].toLowerCase();
	let nombre_proceso = proceso.split(/\./)[1];

	let r = path.join(ruta, familia + "_"+ nombre_proceso + ".js");

	return r;
	
}


function __crearDirectorioFamilia(ruta){

	if(!fs.existsSync(path.dirname(ruta))){

		__info(`Creando directorio de familia ${path.dirname(ruta)}`)

		return fs.mkdirSync(path.dirname(ruta));

	}

}

function __escribirDirectorioEstructura(ruta){

	if(fs.existsSync(ruta)){
		__aviso(`Ya existe directorio ${ruta} ignorando`);
		return;
	}

	__info(`Creando directorio ${ruta}`);

	return fs.mkdirSync(ruta);

}

function __escribirFichero(ruta, datos, comprobar = false){
	
	if(comprobar && fs.existsSync(ruta)){
		__aviso(`Fichero ${ruta} ya existe. Ignorando`);
		return;
	}

	fs.writeFileSync(ruta, datos)

	__info(`Creado fichero ${ruta}`)

}

function __info(msg){

	console.log("\x1b[36m%s\x1b[0m", msg)
	console.log("\x1b[0m", "");

}

function __aviso(msg){

	console.log("\x1b[33m%s\x1b[0m", msg)
	console.log("\x1b[0m", "");

}

module.exports = {

	escribirProceso,
	escribirProcesoProbeta,
	escribirEstructura


}
