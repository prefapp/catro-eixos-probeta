const ParcheBase = require("./base");

module.exports = class extends ParcheBase{

	constructor(proceso, args = {}){

		super(proceso);

		this.paso = args.paso;
		this.codigo = args.codigo;

		if(!this.paso)
			throw `PARCHE:agregador_paso: falta el paso a agregar`;

		if(!this.codigo)
			throw `PARCHE:agregador_paso: falta el codigo a ejecutar`;

	}

	parchear(objetoProceso){

		this.__parcheInstancia(

			objetoProceso,

			this.paso, 

			this.codigo

		)

	}

}
