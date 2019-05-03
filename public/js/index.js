var id;
var select;
function invertir(){
    $("#container-clientes-tabla").slideToggle(500);
    $("#busqueda-bar").slideToggle(500);
    $("#container-editar").slideToggle(500);
}


$(document).ready(function(){

   $(".dropdown-menu").click(function(event) {
       $(this).children(".drop").slideToggle(500);
   });
    

   

    
});



$(document).ready(function () {	
    
    //=================================================================
    //click on table body
    //$("#tableMain tbody tr").click(function () {
    $('#clientes-tabla tbody').on('click', 'tr', function() {
        //get row contents into an array
        var tableData = $(this).children("td").map(function() {
            return $(this).text();
        }).get();
        id = tableData[0];
        var td = tableData[1] ;
        select = {
            id: tableData[0],
            nombre: tableData[1],
            telefono: tableData[2],
            direccion: tableData[3]
        }

        $( "#container-editar input[name='nombre']").val(tableData[1])
        $( "#container-editar input[name='telefono']").val(tableData[2])
        $( "#container-editar input[name='direccion']").val(tableData[3])
        //alert(td);
        invertir()
        console.log(id)
    });




});	



function borrar(){
    console.log(select);
    const _id = id;
    $.ajax(
        {
            url:`/clientes/borrar/`,
            type: 'POST',
            data:{select},
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


function actualizar(){
    const cliente  = {
        id: select.id,
        nombre: $("#container-editar input[name='nombre']").val(),
        telefono: $("#container-editar input[name='telefono']").val(),
        direccion: $("#container-editar input[name='direccion']").val()
    }
    $.ajax(
        {
            url:`/clientes/actualizar/`,
            type: 'POST',
            data:{cliente},
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



