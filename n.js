function a(){

	b(3, ...arguments);

}

function b(c, n, m){

	console.log(`${c} ${n} u ${m}`)

}

a(1, 2);
