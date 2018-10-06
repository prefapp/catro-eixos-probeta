module.exports = {

	esFuncion(fn){

		if(!fn) return false;

		return fn && {}.toString.call(fn) === '[object Function]' ||
			{}.toString.call(fn) === '[object AsyncFunction]'
	},

	esObjeto(obj){

		if(!obj) return false;

		return typeof obj === 'object';
		
	},
	
	esArray(arr){

		return Array.isArray(arr);

	},

	esString(str){

		return "string" === typeof str

	}



}
