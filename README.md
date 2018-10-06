# CatroEixos-Probeta

Sistema unificado de tests para catro-eixos-js empleando mocha y chai. 

## Funcionamiento

CE-Probeta extiende las unidades básicas de tests para mocha, agregando funcionalidades específicas para utilizar con los procesos de catro-eixos-js


### Ejemplo

```js

describe("Un test para un proceso", function(){

	probeta.init(

		"Ejemplo": __dirname + "/../../lib/procesos/familia"

	)

	probeta.proceso(

		"Ejemplo.a", {

		}


	).parches({

		""
		

	}).test(function(resultados){

		
		

	})

})


```

## Ejecución de procesos secundarios

Probeta permite ejecutar procesos antes (pre), después (post) y durante (en) la ejecución del proceso principal que se está testeando. 






