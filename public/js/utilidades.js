function SliderToggleId(){ //Recibe string del id del elemento para invertir su visibilidad
    if(arguments.length == 0 ) return "Se necesita al menos un id";
    for (let i = 0; i < arguments.length; i++) {
		$(`#${arguments[i]}`).slideToggle(500);
	}
}
function SliderToggleClass(){ // Recibe un string de la clase del elemento para invertir su visibilidad
    if(arguments.length == 0 ) return "Se necesita al menos una clase";
    for (let i = 0; i < arguments.length; i++) {
		$(`.${arguments[i]}`).slideToggle(500);
	}
}