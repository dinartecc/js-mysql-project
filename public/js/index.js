
var select = {
    id: null,
    nombre: null,
    telefono: null,
    direccion: null,
    get: function(){
        this.id = select.id || null,
        this.nombre = $("#container-editar input[name='nombre']").val(),
        this.telefono = $("#container-editar input[name='telefono']").val(),
        this.direccion = $("#container-editar input[name='direccion']").val()
    }
}

/* Seleccion de tabla */

$(".dropdown-menu").click(function(event) {
   $(this).children(".drop").slideToggle(500);
});






