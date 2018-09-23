const fs = require("fs");

const path = require("path");

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

	__crearDirectorioFamilia(ruta);

	__escribirFichero(ruta, d);
	
}

function escribirProcesoProbeta(args){

	let d = __cargarPlantilla("proceso_test");

	d = __interpolarDatos(d, args);

	if(args["__raw__"]) return d;

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

function __crearDirectorioFamilia(ruta){

	if(!fs.existsSync(path.dirname(ruta))){

		console.log(`Creando directorio de familia ${path.dirname(ruta)}`)

		return fs.mkdirSync(path.dirname(ruta));

	}

}

function __escribirFichero(ruta, datos){
	
	fs.writeFileSync(ruta, datos)

}

module.exports = {

	escribirProceso,
	escribirProcesoProbeta


}
