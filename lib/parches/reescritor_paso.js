const ParcheBase = require("./base");

module.exports = class extends ParcheBase{

	constructor(proceso, args = {}){

		super(proceso);

		this.paso = args.paso;
		this.codigo = args.codigo;

		if(!this.paso)
			throw `PARCHE:reescritor_paso: falta el paso a reescribir`;

		if(!this.codigo)
			throw `PARCHE:reescritor_paso: falta el codigo de reescritura`;

	}

	parchear(objetoProceso){

		if(!objetoProceso[this.paso])
			throw `PARCHE:reescritor_paso: el objeto proceso no tiene paso ${this.paso}`

		this.__parcheInstancia(

			objetoProceso,

			this.paso, 

			this.codigo

		)

	}

}
