
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




$(function(){



    fetch('/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({query: "{ hello }"})
      })
        .then(r => r.json())
        .then(data => console.log(data.data.hello));




    var busquedaDinamica = $('#busqueda-dinamica')
    busquedaDinamica.keypress(function(event) {
        console.log("PRESS")
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            let tablaModificar = $(`#${getSelectBtn()} tbody`)
            let busqueda = busquedaDinamica.val()
            console.log(tablaModificar)
            if((busquedaDinamica.val() !== '')){
            }else{
                //return undefined;
            }  
            var tipo = 'nombre';
            var selected = getSelectBtn();
            fetch(`/clasificacion/buscar/`, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify({tabla: selected, busqueda: busqueda, tipo: tipo }), // data can be `string` or {object}!
                headers:{
                  'Content-Type': 'application/json'
                }
              })
              .then( (response) => { return response.json()})
              .then ((response) => {
                var appendTable = [];
                for (let arreglo of response) {
                    appendTable.push('<tr>')
                    for( let prop of arreglo){
                        appendTable.push('<td>')
                        appendTable.push(prop)
                        appendTable.push('</td>') 
                    }
                    appendTable.push('</tr>')
                }
                var append = appendTable.join("")
                return append;
              })
              .then((response) => {
                  console.log(response)
                  tablaModificar.empty()
                  tablaModificar.append(response)
              })
              .catch(error => console.error('Error:'+ error))
              event.stopPropagation();
        }
    })
})

