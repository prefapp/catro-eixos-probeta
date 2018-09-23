const ParcheBase = require("./base");

module.exports = class extends ParcheBase{

	constructor(proceso, args = {}){

		super(proceso);

		this.evaluar = args.evaluar || function(){};

		this.resultados = args.resultados || function(){
			return "SIN_SALIDA"
		};

	}

	parchear(objetoProceso){

		const resultados = this.resultados;

		const _self = this;

		this.__parcheInstancia(

			objetoProceso,

			"comandoShell", 

			function(comando, args, opciones){

				return new SimuladorShell(

					_self,

					this,

				).lanzar(comando, args, opciones);

			}

		)

	}

}

class SimuladorShell{

	constructor(parche, objetoProceso){

		this.parche = parche;
		this.evaluar = parche.evaluar;
		this.objetoProceso = objetoProceso;

	}

	lanzar(comando, args, opciones){

		const proceso = this.parche.proceso;
		const paso = this.objetoProceso.pasoActual;

		return Promise.resolve().then(() => {
	
			this.evaluar({proceso, paso}, {comando, args, opciones});

		}).then(() => {

			return this.parche.resultados(

				{proceso, paso}, 

				{comando, args, opciones}

			);

		})

	}
	

}
