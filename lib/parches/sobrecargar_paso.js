const ParcheBase = require("./base");

module.exports = class extends ParcheBase{

	constructor(proceso, paso, codigo){

        console.log(arguments)

		super(proceso);

		this.paso = paso;
		this.codigo = codigo;

		if(!this.paso)
			throw `PARCHE:sobrecargador_paso: falta el paso a sobrecargar`;

		if(!this.codigo)
			throw `PARCHE:sobrecargador_paso: falta el codigo de sobrecarga`;

	}

	parchear(objetoProceso){

		if(!objetoProceso[this.paso])
			throw `PARCHE:sobrecargador_paso: el objeto proceso no tiene paso ${this.paso}`

		const codigo_original = objetoProceso[this.paso];

		const codigo_sobrecarga = this.codigo;

		const codigo = function(arg){

			codigo_sobrecarga.call(this);

			return codigo_original.call(this, arg);

		}

		this.__parcheInstancia(

			objetoProceso,

			this.paso, 

			codigo

		)

	}

}
