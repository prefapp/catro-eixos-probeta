const {Proceso} = require("catro-eixos-js");

module.exports = class extends Proceso{

	parametrosNecesarios(){

		return {

		}

	}

	__r(){

		return [
		
			"__comprobarSlotA",
			"__esperarSlotA",
			"__comprobarSlotB",
			"__esperarSlotB",
		]

	}

	__comprobarSlotA(){

	}

	REP__esperarSlotA(ok){

		if(!ok)
			return this.__esperar(0.5).then(() => true)
		else
			return false;
	}

	__esperarSlotA(){

		return this.A("slot_a")

	}

	__comprobarSlotB(){

	}

	REP__esperarSlotB(ok){

		if(!ok)
			return this.__esperar(0.5).then(() => true)
		else
			return false;

	}

	__esperarSlotB(){

		return this.A("slot_b")

	}

}
