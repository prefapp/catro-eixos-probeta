const ParcheBase = require("./base");

const {FS}

module.exports = class extends ParcheBase{

	constructor(proceso, args = {}){

		super(proceso);

		this.receptores = args.receptores;
	}

	parchear(objetoProceso){

		const _self = this;

		const utiles_fs = objetoProceso.UtilesFS;

		this.__parcheInstancia(

			objetoProceso,

			"UtilesFS", 

			function(){

				new SimuladorFS(

					_self,

					this,

					utiles_fs

				)

			}

		)

	}

}


class SimuladorFS{


	constructor(refParche, refObjetoProceso, utiles_fs){

		this.refParche = refParche;
		this.refObjetoProceso = refObjetoProceso;
		this.utiles_fs = utiles_fs;

	}
	
	escribirFichero(){
		
		return this.__tramitar("escribirFichero", ...arguments);
	}

	leerFichero(){

		return this.__tramitar("leerFichero", ...arguments);
	}

	existeFichero(){

		return this.__tramitar("existeFichero", ...arguments);
	}
	
	borrarFichero(){

		return this.__tramitar("borrarFichero", ...arguments);
	}

	listarDirectorio(){

		return this.__tramitar("listarDirectorio", ...arguments);
	}

}
