

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


$('#clientes-tabla tbody').on('click', 'tr', function() {
    //Obtiene el contenido de la fila y lo ingresa a un arreglo
    var tableData = $(this).children("td").map(function() {
        return $(this).text();
    }).get();
    select.id = tableData[0]
    $( "#container-editar input[name='nombre']").val(tableData[1])
    $( "#container-editar input[name='telefono']").val(tableData[2])
    $( "#container-editar input[name='direccion']").val(tableData[3])
    invertir()

});

