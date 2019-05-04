

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

function invertir(){
    $("#container-clientes-tabla").slideToggle(500);
    $("#busqueda-bar").slideToggle(500);
    $("#container-editar").slideToggle(500);
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


function borrar(){
    select.get()
    console.log(JSON.stringify(select.id))
    var id = select.id
    fetch('/clientes/borrar/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify({id: select.id}), // data can be `string` or {object}!
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => console.log(res))
      .catch(error => console.error('Error:', error))
      
      




    /*$.ajax(
        {
            url:`/clientes/borrar/`,
            type: 'POST',
            data:{id: select.id},
            dataType: 'json',
            success: function(data) {
                console.log(data)
                
                
            },

            error: function (jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+ err)
            }
        }
    )*/

}


function actualizar(){

    select.get();
    $.ajax(
        {
            url:`/clientes/actualizar/`,
            type: 'POST',
            data:{
                id: select.id,
                nombre: select.nombre,
                telefono: select.telefono,
                direccion: select.direccion
            },
            dataType: 'json',
            success: function(data) {
                console.log(data)
                invertir()
                
            },
            /*error: function (jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+ err)
            }*/
        }
    )

}



$('#cliente').on("change paste keyup",() => {
    console.log("HOLAA")
    var busqueda = $('#cliente').val()
    var tabla = $('#clientes-tabla');
    var add = $('#respuesta-ajax');
    var check;



    if ($('#nombre-input').prop('checked')){
        check = 'nombre';
    }else if ($('#telefono-input').prop('checked')){
        check = 'telefono';
    }else if ($('#id-input').prop('checked')){
        check = 'ID_cliente';
    }else{
        alert('Que intentas hacer?');
    }
    console.log(check);



    tabla.find("tbody tr").remove;
    //$('#respuesta-ajax').empty()
    $.ajax(
        {
            url:'/clientes/buscar',
            type: 'POST',
            data:{busqueda, check},
            dataType: 'json',
                success: function(data) {
                
                add.empty();
                console.log(data.respuesta);
                for (let i = 0; i < data.respuesta.length; i++){
                    add.append(`
                    <tr>
                        <td> ${data.respuesta[i].ID_cliente} </td>
                        <td> ${data.respuesta[i].nombre} </td>
                        <td> ${data.respuesta[i].telefono} </td>
                        <td> ${data.respuesta[i].direccion} </td>
            
                    </tr>
                    `)
                
            }
            },
            error: function (jqXHR, textStatus, err){
                alert('text status '+textStatus+', err '+ err)
            }
        }
    )


})