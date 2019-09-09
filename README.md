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

### Pre

Durante la fase pre se puede lanzar un número arbitrario de procesos:

```js

probeta.proceso(

    "Ejemplo.a", {

    }

).pre([

    {
        tipo: "proceso",
        
        proceso: "Previo.primero",

        args: {

        }
    },

    {
        tipo: "proceso",

        proceso: "Previo.segundo",

        args: {

        }

    }


])

```
### Post 


## Alijo

### Alijo Global

Se puede modificar el alijo global del procesador antes de realizar el test

```js

probeta.proceso(

    "Mi.proceso",
    
    {

    }

).alijoGlobal({

    //los valores que queramos que estén presentes en el alijo
    //de forma previa a la ejecución

    "__LLAMADA_A__": function(){},

    "__VALOR_B": 1

}).test(function(){


})

```

También se puede resetear el alijo global:

```js

    probeta.proceso(

        "Mi.proceso",

        {}

    )

    .RESET_ALIJO_GLOBAL()

    .test(function(){


    })

```







